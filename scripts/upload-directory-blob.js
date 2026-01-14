/**
 * Upload JPG/JPEG/PNG images from a public subdirectory to Vercel Blob as WebP
 *
 * Use:
 *  npm run upload-directory-blob -- public/media/media-polaroids
 */


// make sure you have your .env in your root directory
require('dotenv').config();

const { put } = require('@vercel/blob');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --------------------
// CLI args
// --------------------
const args = process.argv.slice(2);
const DELETE_ORIGINALS = args.includes('--delete-originals');
const TARGET_DIR = args.find(arg => !arg.startsWith('--'));

if (!TARGET_DIR) {
  console.error('Please provide a directory inside /public');
  process.exit(1);
}

// --------------------
// paths
// --------------------
const PUBLIC_DIR = path.resolve('public');
const INPUT_DIR = path.resolve(TARGET_DIR);

// ensure input is inside /public
if (!INPUT_DIR.startsWith(PUBLIC_DIR)) {
  console.error('Directory must be inside /public');
  process.exit(1);
}

// --------------------
// helpers
// --------------------
function findImageFiles(dir, results = []) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findImageFiles(fullPath, results);
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      results.push(fullPath);
    }
  }
  return results;
}

function getBlobPath(filePath) {
  const relativeToPublic = path.relative(PUBLIC_DIR, filePath);
  return relativeToPublic.replace(/\.(jpg|jpeg|png)$/i, '.webp').replace(/\\/g, '/');
}

async function convertAndUpload(filePath) {
  const blobPath = getBlobPath(filePath);
  console.log(`Processing: ${blobPath}`);

  try {
    const webpBuffer = await sharp(filePath)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    // put() will replace existing files with the same path
    // this is so when we replace specific images, we just need to make sure
    // the name is the same
    await put(blobPath, webpBuffer, {
      access: 'public',
      contentType: 'image/webp',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    console.log(`UPLOADED: ${blobPath}`);

    if (DELETE_ORIGINALS) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`FAILED to upload ${blobPath}:`, error.message);
    throw error;
  }
}


async function run() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN not set');
    process.exit(1);
  }

  if (!fs.existsSync(INPUT_DIR)) {
    console.error('Directory does not exist');
    process.exit(1);
  }

  const images = findImageFiles(INPUT_DIR);

  if (images.length === 0) {
    console.log('No JPG/JPEG/PNG images found');
    return;
  }

  console.log(`Found ${images.length} image(s)`);

  let successCount = 0;
  let failCount = 0;

  for (const image of images) {
    try {
      await convertAndUpload(image);
      successCount++;
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      failCount++;
      // Continue processing other images even if one fails
    }
  }

  console.log(`\nCompleted: ${successCount} succeeded, ${failCount} failed`);

  console.log('Done!');
}

run().catch(console.error);
