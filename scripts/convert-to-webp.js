const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'public', 'team', 'teamPhotos');
const outputDir = path.join(__dirname, '..', 'public', 'team', 'teamPhotos');

async function convertToWebP() {
  if (!fs.existsSync(inputDir)) {
    console.error(`Directory not found: ${inputDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log('No JPG/PNG files found to convert.');
    process.exit(0);
  }

  console.log(`Found ${imageFiles.length} images to convert...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    // Skip if webp already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⊘ Skipping ${file} (webp already exists)`);
      continue;
    }

    try {
      await sharp(inputPath)
        .webp({ 
          quality: 85,
          effort: 6
        })
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFile(outputPath);
      
      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
      
      console.log(`✓ ${file} → ${baseName}.webp (${savings}% smaller)`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  }

  console.log('\n✅ Conversion complete! WebP files saved to:', outputDir);
}

convertToWebP().catch(console.error);
