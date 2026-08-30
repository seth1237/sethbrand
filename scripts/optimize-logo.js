#!/usr/bin/env node
const sharp = require('sharp')
const path = require('path')

const publicDir = path.join(process.cwd(), 'public')
const appDir = path.join(process.cwd(), 'app')
const logoPath = path.join(publicDir, 'logo.png')

async function optimizeLogo() {
  console.log('🎨 Optimizing logo for web and metadata...\n')

  try {
    // Create favicon (32x32)
    await sharp(logoPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'))
    console.log('✓ Created favicon-32x32.png')

    // Create favicon (16x16)
    await sharp(logoPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'))
    console.log('✓ Created favicon-16x16.png')

    // Create apple touch icon (180x180)
    await sharp(logoPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'))
    console.log('✓ Created apple-touch-icon.png')

    // Copy to app directory for Next.js metadata
    await sharp(logoPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(appDir, 'icon.png'))
    console.log('✓ Created app/icon.png')

    await sharp(logoPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(appDir, 'apple-icon.png'))
    console.log('✓ Created app/apple-icon.png')

    // Create Open Graph image (1200x630)
    await sharp(logoPath)
      .resize(1200, 630, { 
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'og-image.png'))
    console.log('✓ Created og-image.png')

    // Create WebP versions for web use
    await sharp(logoPath)
      .webp({ quality: 90 })
      .toFile(path.join(publicDir, 'logo.webp'))
    console.log('✓ Created logo.webp')

    await sharp(logoPath)
      .avif({ quality: 80 })
      .toFile(path.join(publicDir, 'logo.avif'))
    console.log('✓ Created logo.avif')

    console.log('\n✅ Logo optimization complete!')
  } catch (err) {
    console.error('Error optimizing logo:', err.message)
    process.exit(1)
  }
}

optimizeLogo()
