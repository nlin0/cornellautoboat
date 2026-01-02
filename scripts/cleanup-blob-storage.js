/**
 * Script to clean up Vercel Blob Storage
 * Keeps only images in about/media/ and team/ folders
 * Deletes everything else
 * 
 * Usage:
 *   node scripts/cleanup-blob-storage.js
 */

const { list, del } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Load .env.local file if it exists
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

const token = process.env.BLOB_READ_WRITE_TOKEN;

// Folders to KEEP (everything else will be deleted)
const KEEP_PREFIXES = [
  'about/media/',
  'team/',
];

async function cleanupBlobStorage() {
  if (!token) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log('🔍 Listing all blobs in storage...\n');

  try {
    // List all blobs
    const { blobs } = await list({ token });

    console.log(`Found ${blobs.length} total blob(s)\n`);

    // Filter blobs to delete (those NOT in keep folders)
    const blobsToDelete = blobs.filter(blob => {
      const pathname = blob.pathname;
      // Check if pathname starts with any of the keep prefixes
      const shouldKeep = KEEP_PREFIXES.some(prefix => pathname.startsWith(prefix));
      return !shouldKeep; // Delete if NOT in keep folders
    });

    const blobsToKeep = blobs.filter(blob => {
      const pathname = blob.pathname;
      return KEEP_PREFIXES.some(prefix => pathname.startsWith(prefix));
    });

    console.log(`📊 Summary:`);
    console.log(`   ✅ To keep: ${blobsToKeep.length} blob(s)`);
    console.log(`   🗑️  To delete: ${blobsToDelete.length} blob(s)\n`);

    if (blobsToDelete.length === 0) {
      console.log('✅ No blobs to delete. All blobs are in keep folders.');
      return;
    }

    // Show what will be deleted
    console.log('📋 Blobs to be deleted:');
    blobsToDelete.forEach(blob => {
      console.log(`   - ${blob.pathname}`);
    });
    console.log('');

    // Confirm before deleting (you can remove this if you want automatic deletion)
    console.log('⚠️  This will delete the above blobs from Vercel Blob Storage.');
    console.log('   Press Ctrl+C to cancel, or wait 3 seconds to proceed...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Delete blobs
    let deletedCount = 0;
    let failedCount = 0;

    console.log('🗑️  Deleting blobs...\n');

    for (let i = 0; i < blobsToDelete.length; i++) {
      const blob = blobsToDelete[i];
      try {
        await del(blob.url, { token });
        process.stdout.write(`[${i + 1}/${blobsToDelete.length}] ✓ Deleted: ${blob.pathname}\n`);
        deletedCount++;
        // Small delay to avoid rate limits
        if (i < blobsToDelete.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`\n✗ Failed to delete ${blob.pathname}:`, error.message);
        failedCount++;
      }
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`   ✓ Deleted: ${deletedCount} blob(s)`);
    console.log(`   ✗ Failed: ${failedCount} blob(s)`);
    console.log(`   ✅ Kept: ${blobsToKeep.length} blob(s)`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupBlobStorage().catch(console.error);

