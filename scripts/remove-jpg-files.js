/**
 * Script to remove ALL JPG/JPEG files from a specified folder
 * 
 * This script recursively finds and removes all .jpg, .jpeg, and .JPG files
 * from the specified folder and its subdirectories.
 * 
 * USAGE:
 *   node scripts/remove-jpg-files.js
 * 
 *   Change the FOLDER constant below to target a different directory
 */

const fs = require('fs');
const path = require('path');

// CONFIGURATION - Change this to target different folders
const FOLDER = path.join(__dirname, '..', 'public', 'about', 'media');

/**
 * recursively finds all JPG/JPEG files in a directory
 */
function findJpgFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Error: Directory does not exist: ${dir}`);
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJpgFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * main function to remove JPG files
 */
function removeJpgFiles() {
  console.log(`   Target folder: ${FOLDER}\n`);

  const jpgFiles = findJpgFiles(FOLDER);

  if (jpgFiles.length === 0) {
    console.log('No JPG/JPEG files found in the specified folder.');
    return;
  }

  console.log(`Found ${jpgFiles.length} JPG/JPEG file(s) to remove:\n`);

  let successCount = 0;
  let failCount = 0;

  jpgFiles.forEach((filePath, index) => {
    const relativePath = path.relative(process.cwd(), filePath);
    try {
      fs.unlinkSync(filePath);
      console.log(`   [${index + 1}/${jpgFiles.length}]   REMOVED: ${relativePath}`);
      successCount++;
    } catch (error) {
      console.error(`   [${index + 1}/${jpgFiles.length}] FAILED: ${relativePath}`);
      console.error(`      Error: ${error.message}`);
      failCount++;
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Successfully removed: ${successCount}`);
  if (failCount > 0) {
    console.log(`FAILED: ${failCount}`);
  }
  console.log(`TOTAL: ${jpgFiles.length}`);
}

// Run the script
removeJpgFiles();

