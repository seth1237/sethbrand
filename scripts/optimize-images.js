#!/usr/bin/env node
// Simple image audit script - prints image file sizes in public/ for manual review
const fs = require('fs')
const path = require('path')

const publicDir = path.join(process.cwd(), 'public')

function walk(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const fp = path.join(dir, file)
    const stat = fs.statSync(fp)
    if (stat.isDirectory()) walk(fp)
    else {
      const ext = path.extname(fp).toLowerCase()
      if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'].includes(ext)) {
        console.log(`${path.relative(publicDir, fp)} - ${(stat.size / 1024).toFixed(2)} KB`)
      }
    }
  })
}

if (!fs.existsSync(publicDir)) {
  console.error('public/ directory not found')
  process.exit(1)
}

walk(publicDir)
