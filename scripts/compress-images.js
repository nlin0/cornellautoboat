const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TEAM_PHOTOS_DIR = path.join(__dirname, '../public/team/teamPhotos');
const PLACEHOLDER_IMAGE = path.join(__dirname, '../public/team/ABteam2.JPG');
const QUALITY = 85; // JPEG quality (1-100)
const MAX_WIDTH = 800; // Maximum width in pixels
const MAX_HEIGHT = 800; // Maximum height in pixels

async function compressImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    
    // Get original file size
    const originalStats = fs.statSync(filePath);
    const originalSize = originalStats.size;
    
    // Create temporary output path
    const tempPath = path.join(dir, `.${fileName}.tmp${ext}`);
    let outputPath = filePath;
    
    // Process based on file extension
    if (['.jpg', '.jpeg'].includes(ext)) {
      // Compress JPEG to temporary file first
      await sharp(filePath)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(tempPath);
      
      // Replace original with compressed version
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      outputPath = filePath;
    } else if (ext === '.png') {
      // Convert PNG to JPEG (smaller file size)
      outputPath = path.join(dir, `${fileName}.jpg`);
      await sharp(filePath)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(outputPath);
      
      // Delete original PNG if conversion successful
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(filePath);
        console.log(`  Converted ${path.basename(filePath)} → ${path.basename(outputPath)}`);
      }
    } else {
      console.log(`  Skipping ${path.basename(filePath)} (unsupported format: ${ext})`);
      return;
    }
    
    // Get compressed file size
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = compressedStats.size;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✓ ${path.basename(outputPath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(compressedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
  } catch (error) {
    console.error(`  ✗ Error compressing ${path.basename(filePath)}:`, error.message);
    // Clean up temp file if it exists
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    const tempPath = path.join(dir, `.${fileName}.tmp${ext}`);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function compressAllImages() {
  console.log('🖼️  Starting image compression...\n');
  
  // Compress placeholder image first
  if (fs.existsSync(PLACEHOLDER_IMAGE)) {
    console.log('Compressing placeholder image...\n');
    await compressImage(PLACEHOLDER_IMAGE);
    console.log('');
  } else {
    console.log('Warning: Placeholder image not found at', PLACEHOLDER_IMAGE, '\n');
  }
  
  // Compress team photos
  console.log(`Target directory: ${TEAM_PHOTOS_DIR}\n`);
  
  if (!fs.existsSync(TEAM_PHOTOS_DIR)) {
    console.error(`Error: Directory ${TEAM_PHOTOS_DIR} does not exist!`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(TEAM_PHOTOS_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });
  
  if (imageFiles.length === 0) {
    console.log('No image files found in teamPhotos directory.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} image(s) to compress:\n`);
  
  for (const file of imageFiles) {
    const filePath = path.join(TEAM_PHOTOS_DIR, file);
    await compressImage(filePath);
  }
  
  console.log('\n✅ Image compression complete!');
}

// Run the compression
compressAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

