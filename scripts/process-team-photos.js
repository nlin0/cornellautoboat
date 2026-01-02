/**
 * processes team member photos from staging folder:
 * 1. Reads JPG images from staging folder (public/team/teamPhotos/staging/)
 * 2. Converts JPG to WebP format
 * 3. Uploads to Vercel Blob Storage
 * 4. Updates CSV files with new image paths
 * 
 * NEEDED:
 *   - BLOB_READ_WRITE_TOKEN in .env.local (ask if you do not have)
 *   - Images named: firstname_lastname.jpg
 * 
 * HOW TO USE
 *   just run node scripts/process-team-photos.js
 */

const { put } = require('@vercel/blob');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// load .env.local file if it exists
// if this does not exist, ask nicole/whoever is using vercel
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
const STAGING_DIR = path.join(__dirname, '..', 'public', 'team', 'teamPhotos', 'staging');
const CSV_DIR = path.join(__dirname, '..', 'src', 'app', 'team', 'data');
const CSV_FILES = [
  'team_leads.csv',
  'hardware.csv',
  'software.csv',
  'business.csv'
];

/**
 * normalize a name to match filename format (lowercase, spaces to underscores)
 * "Firstname Lastname" -> "firstname_lastname"
 */
function normalizeName(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '_');
}

/**
 * parse CSV file and return array of rows
 * uses PapaParse for CSV handling 
 */
function parseCSV(filePath) {
  const Papa = require('papaparse');
  const content = fs.readFileSync(filePath, 'utf8');

  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (result.errors.length > 0) {
    console.warn(`WARNING: CSV parsing warnings for ${path.basename(filePath)}:`, result.errors);
  }

  const headers = result.meta.fields || [];
  const rows = result.data.map(row => {
    const cleanRow = {};
    headers.forEach(header => {
      cleanRow[header] = (row[header] || '').trim();
    });
    return cleanRow;
  });

  return { headers, rows };
}

/**
 * write CSV file from headers and rows
 */
function writeCSV(filePath, headers, rows) {
  const Papa = require('papaparse');

  // convert rows to array of arrays
  const data = rows.map(row => headers.map(header => row[header] || ''));

  // include headers
  const csvContent = Papa.unparse([headers, ...data], {
    quotes: true, // quote fields when necessary
    header: false, // no headers
  });

  fs.writeFileSync(filePath, csvContent + '\n', 'utf8');
}

/**
 * Find member in CSV files by normalized name
 */
function findMemberInCSVs(normalizedFilename) {
  for (const csvFile of CSV_FILES) {
    const csvPath = path.join(CSV_DIR, csvFile);
    if (!fs.existsSync(csvPath)) {
      console.warn(`⚠️  CSV file not found: ${csvFile}`);
      continue;
    }

    const { headers, rows } = parseCSV(csvPath);

    // verify required columns exist
    if (!headers.includes('name') || !headers.includes('image')) {
      console.warn(`⚠️  CSV file missing 'name' or 'image' column: ${csvFile}`);
      continue;
    }

    for (const row of rows) {
      const memberName = row.name;
      if (!memberName) continue;

      const normalizedMemberName = normalizeName(memberName);
      if (normalizedMemberName === normalizedFilename) {
        return {
          csvFile,
          csvPath,
          memberName,
          row,
          headers,
          allRows: rows
        };
      }
    }
  }

  return null;
}

/**
 * process a JPG
 */
async function processImage(jpgPath, token) {
  // extract filename
  const ext = path.extname(jpgPath).toLowerCase();
  const fileName = path.basename(jpgPath, ext);
  const normalizedName = fileName.toLowerCase();

  console.log(`\nPROCESSING: ${path.basename(jpgPath)}`);

  // find member in CSV files
  const memberData = findMemberInCSVs(normalizedName);
  if (!memberData) {
    console.error(`\nFAILURE: Could not find member matching "${fileName}" in any CSV file`);
    console.error(`\nExpected format: firstname_lastname.jpg`);
    return false;
  }

  console.log(`\nFound member: ${memberData.memberName} in ${memberData.csvFile}`);

  // convert to WebP
  const webpBuffer = await sharp(jpgPath)
    .webp({ quality: 85, effort: 6 })
    .resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .toBuffer();

  console.log(`\nSUCCESS: Converted to WebP`);

  // Upload to blob storage
  const blobPathname = `team/teamPhotos/${normalizedName}.webp`;
  try {
    const blob = await put(blobPathname, webpBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: token
    });
    console.log(`\nSUCCESS: Uploaded to blob storage: ${blob.url}`);
  } catch (error) {
    console.error(`\nFAILURE: Failed to upload to blob: ${error.message}`);
    return false;
  }

  // update CSV file
  const imagePath = `/team/teamPhotos/${normalizedName}.webp`;
  memberData.row.image = imagePath;

  writeCSV(memberData.csvPath, memberData.headers, memberData.allRows);
  console.log(`\nSUCCESS: Updated ${memberData.csvFile} with new image path`);

  return true;
}

/**
 * Main function
 */
async function main() {
  console.log('Processing team member photos...\n');

  // check staging directory
  if (!fs.existsSync(STAGING_DIR)) {
    console.error(`\nFAILURE: Staging directory not found: ${STAGING_DIR}`);
    console.error(`\nCreate the directory and add JPG files named: firstname_lastname.jpg`);
    process.exit(1);
  }

  // check for token
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('\nFAILURE: BLOB_READ_WRITE_TOKEN not found in environment variables');
    console.error('   Run: vercel env pull');
    console.error('   Or set it in .env.local');
    process.exit(1);
  }

  // find all JPG
  const files = fs.readdirSync(STAGING_DIR);
  const jpgFiles = files.filter(file => /\.(jpg|jpeg)$/i.test(file));

  if (jpgFiles.length === 0) {
    console.log('No JPG files found in staging directory');
    console.log(`   Directory: ${STAGING_DIR}`);
    console.log('   Expected format: firstname_lastname.jpg');
    process.exit(0);
  }

  console.log(`Found ${jpgFiles.length} image(s) to process:\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of jpgFiles) {
    const jpgPath = path.join(STAGING_DIR, file);
    const success = await processImage(jpgPath, token);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\nSUCCESS: Summary:`);
  console.log(`   Processed: ${successCount} successfully`);
  if (failCount > 0) {
    console.log(`   Failed: ${failCount}`);
  }

  if (successCount > 0) {
    console.log(`\nNOTE: You can now delete the processed files from the staging folder`);
  }
}

main().catch(error => {
  console.error('ERROR:', error);
  process.exit(1);
});

