/**
 * Script to download and re-upload screenshot images from blob storage
 * 
 * This fixes issues with special characters in filenames (like non-breaking spaces)
 * by downloading the images and re-uploading them with cleaned filenames.
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

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

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const BLOB_STORAGE_BASE_URL = 'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com';

// URLs to download and re-upload
const urlsToFix = [
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat%2025/Screenshot%202024-04-13%20at%2011.57.11%E2%80%AFPM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat%2025/Screenshot%202024-04-13%20at%2011.58.27%E2%80%AFPM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat23/Screenshot%202024-04-14%20at%2012.02.59%E2%80%AFAM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat%2025/Screenshot%202024-04-13%20at%2011.59.42%E2%80%AFPM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat24/Screenshot%202024-04-14%20at%2012.03.42%E2%80%AFAM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat24/Screenshot%202024-04-14%20at%2012.04.20%E2%80%AFAM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat24/Screenshot%202024-04-14%20at%2012.04.57%E2%80%AFAM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat24/Screenshot%202024-04-14%20at%2012.05.20%E2%80%AFAM.webp',
  'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat24/Screenshot%202024-04-14%20at%2012.06.16%E2%80%AFAM.webp',
];

/**
 * Downloads a file from a URL
 */
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Extracts the clean path from a blob URL
 * Converts URL-encoded paths to clean paths
 */
function extractCleanPath(url) {
  // Extract the path part after the base URL
  const urlObj = new URL(url);
  const encodedPath = urlObj.pathname;
  
  // Decode the path
  let decodedPath = decodeURIComponent(encodedPath);
  
  // Remove leading slash if present
  if (decodedPath.startsWith('/')) {
    decodedPath = decodedPath.slice(1);
  }
  
  // Replace non-breaking spaces and other special characters with regular spaces
  decodedPath = decodedPath.replace(/\u200F/g, ' '); // Non-breaking space
  decodedPath = decodedPath.replace(/\u00A0/g, ' '); // Another non-breaking space
  decodedPath = decodedPath.replace(/\s+/g, ' '); // Multiple spaces to single space
  
  return decodedPath;
}

/**
 * Processes a single image: download and re-upload
 */
async function processImage(url) {
  try {
    console.log(`\n📥 Downloading: ${url}`);
    
    // Download the image
    const imageBuffer = await downloadFile(url);
    console.log(`   Downloaded ${(imageBuffer.length / 1024).toFixed(2)} KB`);
    
    // Extract clean path
    const cleanPath = extractCleanPath(url);
    console.log(`   Clean path: ${cleanPath}`);
    
    // Re-upload to blob storage with clean path
    console.log(`   Uploading to blob storage...`);
    const blob = await put(cleanPath, imageBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: BLOB_READ_WRITE_TOKEN,
    });
    
    console.log(`UPLOADED: ${blob.url}`);
    
    return {
      success: true,
      originalUrl: url,
      newUrl: blob.url,
      cleanPath: cleanPath,
    };
  } catch (error) {
    console.error(`ERROR processing ${url}:`, error.message);
    return {
      success: false,
      originalUrl: url,
      error: error.message,
    };
  }
}

/**
 * Main function
 */
async function reuploadImages() {
  if (!BLOB_READ_WRITE_TOKEN) {
    console.error('ERROR: BLOB_READ_WRITE_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log(`🔄 Processing ${urlsToFix.length} images...\n`);

  const results = {
    success: [],
    failed: [],
  };

  // Process images sequentially
  for (let i = 0; i < urlsToFix.length; i++) {
    const url = urlsToFix[i];
    const result = await processImage(url);
    
    if (result.success) {
      results.success.push(result);
    } else {
      results.failed.push(result);
    }

    // Small delay between uploads
    if (i < urlsToFix.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Re-upload Summary');
  console.log('='.repeat(60));
  console.log(`Successfully re-uploaded: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Total: ${urlsToFix.length}`);

  if (results.success.length > 0) {
    console.log('\n✅ Successfully re-uploaded images:');
    results.success.forEach(result => {
      console.log(`   ${result.cleanPath}`);
      console.log(`   → ${result.newUrl}`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\n❌ Failed images:');
    results.failed.forEach(result => {
      console.log(`   ${result.originalUrl}: ${result.error}`);
    });
  }

  console.log('\n📝 Next steps:');
  console.log('   Update albumMetadata.json with the new clean paths');
  console.log('   The new paths should use regular spaces instead of special characters');
}

// Run the script
reuploadImages().catch(error => {
  console.error('FATAL ERROR:', error);
  process.exit(1);
});

