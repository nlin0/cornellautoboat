/**
 * Script to upload existing WebP images from public/media/ to Vercel Blob Storage
 * 
 * This script is useful when:
 * - Images have already been converted to WebP
 * - The media folder has been moved (e.g., from about/media to media)
 * - You need to re-upload with new paths to blob storage
 * 
 *   1. Finds all WebP images in public/media/ (recursively)
 *   2. Uploads them to Vercel Blob Storage with the new path structure
 * 
 * PREREQS:
 *   - BLOB_READ_WRITE_TOKEN environment variable must be set (or in .env.local)
 * 
 * USE:
 *   Upload all WebP images to blob storage
 *      npm run upload-media-webp-to-blob
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// load .env.local file if it exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        const value = trimmedLine.substring(equalIndex + 1).trim();
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = cleanValue;
        }
      }
    }
  });
}

// configs
const MEDIA_DIR = path.join(__dirname, '..', 'public', 'media');
const BLOB_STORAGE_BASE_URL = 'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com';

/**
 * finds all WebP image files in a directory (recursive)
 */
function findWebPFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findWebPFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      // ONLY process WebP files
      if (ext === '.webp') {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * gets the relative path from public/ directory
 */
function getRelativePathFromPublic(filePath) {
  const publicPath = path.join(__dirname, '..', 'public');
  return path.relative(publicPath, filePath).replace(/\\/g, '/');
}

/**
 * uploads a single WebP file to blob storage
 */
async function uploadWebP(filePath, token) {
  // get relative path from public/ for blob storage
  const relativePath = getRelativePathFromPublic(filePath);
  
  // normalize .JPG.webp or .jpg.webp to .webp to match blob storage naming
  const blobPathname = relativePath.replace(/\.(jpg|jpeg)\.webp$/i, '.webp');

  console.log(`\n📸 Uploading: ${relativePath}`);
  console.log(`   Blob path: ${blobPathname}`);

  try {
    // read the WebP file
    const fileBuffer = fs.readFileSync(filePath);

    // upload to blob storage
    console.log(`   Uploading to blob storage...`);
    const blob = await put(blobPathname, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: token,
    });

    console.log(`✅ UPLOADED: ${blob.url}`);

    return {
      success: true,
      localPath: relativePath,
      blobPath: blobPathname,
      blobUrl: blob.url,
    };
  } catch (error) {
    console.error(`❌ ERROR: uploading ${relativePath}:`, error.message);
    return {
      success: false,
      localPath: relativePath,
      error: error.message,
    };
  }
}

/**
 * Main function to upload all WebP images
 */
async function uploadAllWebPImages() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error('ERROR:: BLOB_READ_WRITE_TOKEN environment variable is required');
    console.error('\nTo fix this:');
    console.error('  Set BLOB_READ_WRITE_TOKEN manually in your environment');
    console.error('\nPlease ask teammember if you do not have token');
    process.exit(1);
  }

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`ERROR: Media directory not found: ${MEDIA_DIR}`);
    process.exit(1);
  }

  console.log('🔍 Scanning for WebP images...');
  const webpFiles = findWebPFiles(MEDIA_DIR);

  if (webpFiles.length === 0) {
    console.log('No WebP images found in media directory.');
    console.log(`   Searched in: ${MEDIA_DIR}`);
    return;
  }

  console.log(`\n📊 Found ${webpFiles.length} WebP image(s) to upload`);

  const results = {
    success: [],
    failed: [],
  };

  // upload images sequentially to avoid overwhelming the API
  for (let i = 0; i < webpFiles.length; i++) {
    const filePath = webpFiles[i];
    const result = await uploadWebP(filePath, token);
    
    if (result.success) {
      results.success.push(result);
    } else {
      results.failed.push(result);
    }

    // small delay between uploads to be respectful to the API
    if (i < webpFiles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // summary
  console.log('\n' + '='.repeat(60));
  console.log('Upload Summary');
  console.log('='.repeat(60));
  console.log(`Successfully uploaded: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Total: ${webpFiles.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed uploads:');
    results.failed.forEach(result => {
      console.log(`   - ${result.localPath}: ${result.error}`);
    });
  }

  if (results.success.length > 0) {
    console.log('\n✅ All images are now in blob storage with the new paths!');
    console.log('   The media pages will automatically use blob URLs via getBlobUrl()');
  }

  console.log('\nImages are now in blob storage and will be served from CDN');
}

// run the script
uploadAllWebPImages().catch(error => {
  console.error('FATAL ERROR:', error);
  process.exit(1);
});

