/**
 * Migration script to upload images from public/ folder to Vercel Blob Storage
 * 
 * Prerequisites:
 *   1. Run: npm install @vercel/blob
 *   2. Run: vercel link (to link project)
 *   3. Run: vercel env pull (to get BLOB_READ_WRITE_TOKEN locally)
 *   4. Or set BLOB_READ_WRITE_TOKEN environment variable manually
 * 
 * Usage:
 *   node scripts/upload-images-to-blob.js
 * 
 * This script:
 *   - Uploads images to Vercel Blob Storage
 *   - Maintains directory structure (team/teamPhotos, technical/, etc.)
 *   - Generates a mapping file for updating code
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Load .env.local file if it exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    // Skip comments and empty lines
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        const value = trimmedLine.substring(equalIndex + 1).trim();
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        // Only set if not already in process.env (env vars take precedence)
        if (!process.env[key]) {
          process.env[key] = cleanValue;
        }
      }
    }
  });
}

// configs
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_MAP_FILE = path.join(__dirname, '..', 'blob-url-mapping.json');

// Image extensions to upload
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

/**
 * Recursively find all image files
 */
async function findImages(dir) {
  const files = [];
  async function traverse(currentDir) {
    const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }
  await traverse(dir);
  return files;
}

async function uploadImageToBlob(filePath, token) {
  const fileBuffer = fs.readFileSync(filePath);
  const relativePath = path.relative(PUBLIC_DIR, filePath);

  // Use relative path as blob pathname to maintain folder structure
  // Convert backslashes to forward slashes for consistency
  const blobPathname = relativePath.replace(/\\/g, '/');
  const fileName = path.basename(filePath);

  try {
    // Upload to blob storage, preserving folder structure
    // The token will be auto-detected from BLOB_READ_WRITE_TOKEN env var,
    // but we can pass it explicitly if needed
    const options = {
      access: 'public',
      addRandomSuffix: false,
    };

    if (token) {
      options.token = token;
    }

    const blob = await put(blobPathname, fileBuffer, options);

    console.log(`✓ Uploaded: ${relativePath} → ${blob.url}`);
    return {
      localPath: `/${relativePath.replace(/\\/g, '/')}`,
      blobUrl: blob.url,
      blobPathname: blobPathname,
    };
  } catch (error) {
    console.error(`✗ Failed to upload ${relativePath}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is required');
    console.error('\n   To fix this:');
    console.error('   1. Run: vercel link (to link your project)');
    console.error('   2. Run: vercel env pull (to pull environment variables)');
    console.error('   OR');
    console.error('   Set BLOB_READ_WRITE_TOKEN manually in your environment');
    console.error('\n   You can find the token in Vercel Dashboard → Your Project → Settings → Environment Variables');
    process.exit(1);
  }

  console.log('🚀 Starting image upload to Vercel Blob Storage...\n');
  console.log(`📁 Scanning: ${PUBLIC_DIR}\n`);

  // Find all image files
  const files = await findImages(PUBLIC_DIR);

  if (files.length === 0) {
    console.log('No image files found to upload.');
    return;
  }

  console.log(`Found ${files.length} image file(s) to upload...\n`);

  const mapping = {};
  let successCount = 0;
  let failCount = 0;

  // Upload files (with rate limiting consideration)
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    process.stdout.write(`[${i + 1}/${files.length}] `);
    const result = await uploadImageToBlob(file, token);
    if (result) {
      mapping[result.localPath] = {
        url: result.blobUrl,
        pathname: result.blobPathname,
      };
      successCount++;
      // Small delay to avoid rate limits (100ms between uploads)
      if (i < files.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } else {
      failCount++;
    }
  }

  // Save mapping file
  fs.writeFileSync(OUTPUT_MAP_FILE, JSON.stringify(mapping, null, 2));

  console.log(`\n✅ Upload complete!`);
  console.log(`   ✓ Success: ${successCount} file(s)`);
  console.log(`   ✗ Failed: ${failCount} file(s)`);
  console.log(`   📄 Mapping saved to: ${OUTPUT_MAP_FILE}`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review the mapping file: ${OUTPUT_MAP_FILE}`);
  console.log(`   2. Update your code to use blob URLs (see docs/IMAGE_MIGRATION_GUIDE.md)`);
  console.log(`   3. Test thoroughly in development`);
  console.log(`   4. Once verified, remove images from public/ folder`);
}

uploadAllImages().catch(console.error);
