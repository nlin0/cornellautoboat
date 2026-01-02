const fs = require('fs');
const path = require('path');

const TEAM_PHOTOS_DIR = path.join(__dirname, '../public/team/teamPhotos');

/**
 * Removes JPG files that have corresponding webp equivalents
 * This helps reduce deployment size since webp files are much smaller
 */
function removeRedundantJPGs() {
  if (!fs.existsSync(TEAM_PHOTOS_DIR)) {
    console.error(`Directory not found: ${TEAM_PHOTOS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(TEAM_PHOTOS_DIR);
  const jpgFiles = files.filter(file => 
    /\.(jpg|JPG)$/.test(file)
  );

  if (jpgFiles.length === 0) {
    console.log('No JPG files found.');
    return;
  }

  console.log(`Found ${jpgFiles.length} JPG file(s) to check...\n`);

  let removedCount = 0;
  let keptCount = 0;
  let totalSizeSaved = 0;

  for (const jpgFile of jpgFiles) {
    const jpgPath = path.join(TEAM_PHOTOS_DIR, jpgFile);
    const basename = path.basename(jpgFile, path.extname(jpgFile));
    
    // Check for webp equivalent (case-insensitive check)
    const webpVariants = [
      path.join(TEAM_PHOTOS_DIR, `${basename}.webp`),
      path.join(TEAM_PHOTOS_DIR, `${basename.toLowerCase()}.webp`),
      path.join(TEAM_PHOTOS_DIR, `${basename.toUpperCase()}.webp`),
    ];

    const webpExists = webpVariants.some(webpPath => fs.existsSync(webpPath));

    if (webpExists) {
      const stats = fs.statSync(jpgPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      totalSizeSaved += stats.size;
      
      console.log(`✓ Removing ${jpgFile} (${sizeMB}MB) - webp equivalent exists`);
      fs.unlinkSync(jpgPath);
      removedCount++;
    } else {
      console.log(`⊘ Keeping ${jpgFile} - NO webp equivalent found`);
      keptCount++;
    }
  }

  console.log(`\n✅ Done!`);
  console.log(`   Removed: ${removedCount} file(s)`);
  console.log(`   Kept: ${keptCount} file(s)`);
  console.log(`   Space saved: ${(totalSizeSaved / (1024 * 1024)).toFixed(2)} MB`);
  
  if (removedCount > 0) {
    console.log(`\n⚠️  Note: The code has a fallback to .JPG files, but since all CSV files`);
    console.log(`   reference .webp files, the JPG fallback is rarely used.`);
    console.log(`   If any images fail to load, they will skip to the placeholder.`);
  }
}

removeRedundantJPGs();

