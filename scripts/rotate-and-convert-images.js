const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TEAM_PHOTOS_DIR = path.join(__dirname, '../public/team/teamPhotos');

// Images to rotate counter-clockwise (270 degrees)
const IMAGES_TO_ROTATE = [
  'keisuke_kwong',
  'olive_li',
  'avishi_trivedi',
  'james_xiao',
  'sorong_dong',
  'andrew_visconti',
  'ty_galasinski'
];

async function rotateWebPImage(filePath) {
  try {
    const fileName = path.basename(filePath);
    const tempPath = path.join(path.dirname(filePath), `.${fileName}.tmp`);
    
    // Rotate counter-clockwise (270 degrees)
    await sharp(filePath)
      .rotate(270)
      .webp({ quality: 85 })
      .toFile(tempPath);
    
    // Replace original with rotated version
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
    
    console.log(`  ✓ Rotated ${fileName} counter-clockwise`);
  } catch (error) {
    console.error(`  ✗ Error rotating ${path.basename(filePath)}:`, error.message);
  }
}

async function convertPlaceholderToWebP() {
  const placeholderJpg = path.join(TEAM_PHOTOS_DIR, 'placeholder.JPG');
  const placeholderWebp = path.join(TEAM_PHOTOS_DIR, 'placeholder.webp');
  
  if (!fs.existsSync(placeholderJpg)) {
    console.log('  ⚠ Placeholder.JPG not found, skipping webp conversion');
    return;
  }
  
  try {
    await sharp(placeholderJpg)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile(placeholderWebp);
    
    const jpgSize = fs.statSync(placeholderJpg).size;
    const webpSize = fs.statSync(placeholderWebp).size;
    const savings = ((jpgSize - webpSize) / jpgSize * 100).toFixed(1);
    
    console.log(`  ✓ Converted placeholder.JPG → placeholder.webp`);
    console.log(`    Size: ${(jpgSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
  } catch (error) {
    console.error(`  ✗ Error converting placeholder:`, error.message);
  }
}

async function processImages() {
  console.log('🖼️  Rotating webp images and converting placeholder...\n');
  
  // Rotate specified webp images
  console.log('Rotating webp images counter-clockwise:\n');
  for (const name of IMAGES_TO_ROTATE) {
    const webpPath = path.join(TEAM_PHOTOS_DIR, `${name}.webp`);
    if (fs.existsSync(webpPath)) {
      await rotateWebPImage(webpPath);
    } else {
      console.log(`  ⚠ ${name}.webp not found, skipping`);
    }
  }
  
  console.log('\n');
  
  // Convert placeholder to webp
  console.log('Converting placeholder to webp:\n');
  await convertPlaceholderToWebP();
  
  console.log('\n✅ Image processing complete!');
}

// Run the script
processImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

