#!/usr/bin/env node
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(process.cwd(), 'public')
const sizes = [640, 828, 1200, 1920] // responsive sizes

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return

  const baseName = path.basename(filePath, ext)
  const dir = path.dirname(filePath)
  
  try {
    // Generate WebP
    const webpPath = path.join(dir, `${baseName}.webp`)
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath)
    console.log(`✓ Created ${path.relative(publicDir, webpPath)}`)

    // Generate AVIF (better compression)
    const avifPath = path.join(dir, `${baseName}.avif`)
    await sharp(filePath)
      .avif({ quality: 75 })
      .toFile(avifPath)
    console.log(`✓ Created ${path.relative(publicDir, avifPath)}`)

    // Generate responsive sizes for large images
    const metadata = await sharp(filePath).metadata()
    if (metadata.width > 828) {
      for (const size of sizes) {
        if (size < metadata.width) {
          const responsivePath = path.join(dir, `${baseName}-${size}w.webp`)
          await sharp(filePath)
            .resize(size, null, { withoutEnlargement: true })
            .webp({ quality: 85 })
            .toFile(responsivePath)
          console.log(`✓ Created ${path.relative(publicDir, responsivePath)}`)
        }
      }
    }
  } catch (err) {
    console.error(`✗ Error processing ${filePath}:`, err.message)
  }
}

async function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fp = path.join(dir, file)
    const stat = fs.statSync(fp)
    if (stat.isDirectory()) {
      await walk(fp)
    } else {
      await optimizeImage(fp)
    }
  }
}

console.log('🖼️  Starting image optimization...\n')
walk(publicDir).then(() => {
  console.log('\n✅ Image optimization complete!')
}).catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
