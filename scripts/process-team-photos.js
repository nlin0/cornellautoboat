/**
 * Script to process team member photos from staging folder
 * 
 * This script:
 *   1. Reads JPG images from public/team/teamPhotos/staging/
 *   2. Converts them to WebP format
 *   3. Uploads to Vercel Blob Storage
 *   4. Updates the corresponding CSV files with the new image path
 * 
 * Prerequisites:
 *   - BLOB_READ_WRITE_TOKEN environment variable must be set (or in .env.local)
 *   - Images in staging folder must be named: firstname_lastname.jpg
 * 
 * Usage:
 *   node scripts/process-team-photos.js
 * 
 * Example:
 *   Place: public/team/teamPhotos/staging/john_doe.jpg
 *   This will:
 *     - Convert to webp
 *     - Upload to blob: team/teamPhotos/john_doe.webp
 *     - Update CSV files where name matches "John Doe"
 */

const { put } = require('@vercel/blob');
const sharp = require('sharp');
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

// Configuration
const STAGING_DIR = path.join(__dirname, '..', 'public', 'team', 'teamPhotos', 'staging');
const CSV_DIR = path.join(__dirname, '..', 'src', 'app', 'team', 'data');
const CSV_FILES = ['team_leads.csv', 'hardware.csv', 'software.csv', 'business.csv'];
const BLOB_STORAGE_BASE_URL = 'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com';

/**
 * Converts a filename like "john_doe" to "John Doe"
 */
function filenameToName(filename) {
  return filename
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Converts a name like "John Doe" to "john_doe"
 */
function nameToFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_');
}

/**
 * Parses a CSV file and returns rows as objects
 */
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n');
  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"') {
        if (inQuotes && lines[i][j + 1] === '"') {
          // Escaped quote ("")
          current += '"';
          j++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }

  return { headers, rows };
}

/**
 * Writes CSV data back to file
 */
function writeCSV(filePath, headers, rows) {
  const lines = [headers.join(',')];

  rows.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Quote values that contain commas, quotes, or newlines
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        // Escape quotes by doubling them
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    lines.push(values.join(','));
  });

  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
}

/**
 * Updates CSV file with new image path for matching member
 */
function updateCSVForMember(csvPath, memberName, imagePath) {
  const { headers, rows } = parseCSV(csvPath);
  let updated = false;

  rows.forEach(row => {
    // Match by name (case-insensitive, flexible spacing)
    const rowName = row.name ? row.name.trim() : '';
    const memberNameClean = memberName.trim();

    // Check if names match (case-insensitive)
    if (rowName.toLowerCase() === memberNameClean.toLowerCase()) {
      if (row.image !== imagePath) {
        row.image = imagePath;
        updated = true;
        console.log(`  ✓ Updated ${path.basename(csvPath)}: ${rowName}`);
      }
    }
  });

  if (updated) {
    writeCSV(csvPath, headers, rows);
  }

  return updated;
}

/**
 * Processes a single image file
 */
async function processImage(filePath, token) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const memberName = filenameToName(fileName);

  console.log(`\n📸 Processing: ${path.basename(filePath)}`);
  console.log(`   Member: ${memberName}`);

  try {
    // Step 1: Convert JPG to WebP using sharp
    console.log(`   Converting to WebP...`);
    const webpBuffer = await sharp(filePath)
      .webp({ quality: 85 })
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // Step 2: Upload to blob storage
    const blobPathname = `team/teamPhotos/${fileName}.webp`;
    console.log(`   Uploading to blob storage...`);

    const blob = await put(blobPathname, webpBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: token,
    });

    console.log(`   ✓ Uploaded: ${blob.url}`);

    // Step 3: Update CSV files
    const imagePath = `/team/teamPhotos/${fileName}.webp`;
    let foundInCSV = false;

    console.log(`   Updating CSV files...`);
    for (const csvFile of CSV_FILES) {
      const csvPath = path.join(CSV_DIR, csvFile);
      if (fs.existsSync(csvPath)) {
        const updated = updateCSVForMember(csvPath, memberName, imagePath);
        if (updated) {
          foundInCSV = true;
        }
      }
    }

    if (!foundInCSV) {
      console.warn(`   ⚠️  Warning: Member "${memberName}" not found in any CSV file.`);
      console.warn(`      Please manually add them to the appropriate CSV.`);
      console.warn(`      Image path: ${imagePath}`);
    }

    // Step 4: Move original file to processed folder (or delete)
    // Option: Keep original for backup, or delete after processing
    // For now, we'll leave it in staging so user can verify and clean up manually

    return {
      success: true,
      memberName,
      imagePath,
      blobUrl: blob.url,
    };

  } catch (error) {
    console.error(`   ✗ Error processing ${path.basename(filePath)}:`, error.message);
    return {
      success: false,
      memberName,
      error: error.message,
    };
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Team Photo Processing Script\n');
  console.log('='.repeat(50));

  // Check for blob token
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is required');
    console.error('');
    console.error('Please run:');
    console.error('  vercel env pull');
    console.error('Or set BLOB_READ_WRITE_TOKEN manually in .env.local');
    process.exit(1);
  }

  // Check if staging directory exists
  if (!fs.existsSync(STAGING_DIR)) {
    console.error(`❌ Error: Staging directory not found: ${STAGING_DIR}`);
    console.error('Please create the directory and add your images there.');
    process.exit(1);
  }

  // Find all JPG files in staging directory
  const files = fs.readdirSync(STAGING_DIR)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg';
    })
    .map(file => path.join(STAGING_DIR, file));

  if (files.length === 0) {
    console.log('ℹ️  No JPG images found in staging folder.');
    console.log(`   Staging folder: ${STAGING_DIR}`);
    console.log('');
    console.log('To use this script:');
    console.log('  1. Place JPG images in: public/team/teamPhotos/staging/');
    console.log('  2. Name them: firstname_lastname.jpg (e.g., john_doe.jpg)');
    console.log('  3. Run this script again');
    process.exit(0);
  }

  console.log(`\nFound ${files.length} image(s) to process:\n`);
  files.forEach(file => {
    console.log(`  - ${path.basename(file)}`);
  });

  // Process each image
  const results = [];
  for (const file of files) {
    const result = await processImage(file, token);
    results.push(result);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Summary:\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✓ Successfully processed: ${successful.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.length}`);
  }

  if (successful.length > 0) {
    console.log('\n✓ Processed images:');
    successful.forEach(r => {
      console.log(`  - ${r.memberName}: ${r.blobUrl}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n✗ Failed images:');
    failed.forEach(r => {
      console.log(`  - ${r.memberName}: ${r.error}`);
    });
  }

  console.log('\n📝 Next steps:');
  console.log('  1. Review the updated CSV files');
  console.log('  2. Remove processed images from staging folder if everything looks good');
  console.log('  3. Commit the CSV changes to git');
  console.log('  4. Deploy to see the updated images on your site\n');
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
