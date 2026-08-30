# SethBrand Deployment Guide

## Backend Server Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Gmail account with app password

### Backend Deployment

1. **Navigate to server folder:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment (.env):**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5012
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
ADMIN_EMAIL=admin@email.com
REPORT_EMAIL=report@email.com
CRON_SECRET=your_secret_key
FRONTEND_URL=https://codewithseth.co.ke
NODE_ENV=production
```

4. **Start the backend:**
```bash
npm start
```

5. **For production with PM2:**
```bash
npm install -g pm2
pm2 start index.js --name sethbrand-backend
pm2 save
pm2 startup
```

### Frontend Deployment

1. **Update environment (.env.production):**
```env
NEXT_PUBLIC_API_URL=https://codewithseth.co.ke
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
ADMIN_EMAIL=admin@email.com
REPORT_EMAIL=report@email.com
CRON_SECRET=your_secret_key
NEXT_PUBLIC_BASE_URL=https://codewithseth.co.ke
NODE_ENV=production
```

2. **Build the frontend:**
```bash
npm run build
```

3. **Start production server:**
```bash
npm start
```

## API Endpoints

- **Health Check:** GET `https://codewithseth.co.ke/health`
- **Contact Form:** POST `https://codewithseth.co.ke/api/contact`
- **Analytics Track:** POST `https://codewithseth.co.ke/api/analytics/track`
- **Weekly Report:** POST `https://codewithseth.co.ke/api/analytics/report` (with `x-cron-secret` header)

## Weekly Analytics Setup

Set up a cron job (or use services like cron-job.org, EasyCron) to hit:
```bash
curl -X POST https://codewithseth.co.ke/api/analytics/report \
  -H "x-cron-secret: your_secret_key"
```

Schedule: Every Monday at 9:00 AM

## Features

✅ MongoDB-backed lead storage
✅ Page view tracking & analytics
✅ Weekly email reports
✅ Contact form with email notifications
✅ SEO Analyzer tool
✅ Marketing ROI Calculator
✅ Pricing in KSH
✅ Case studies
✅ Service pages
✅ Blog system

## Monitoring

Check backend health:
```bash
curl https://codewithseth.co.ke/health
```

View PM2 logs:
```bash
pm2 logs sethbrand-backend
```

## Support

For issues, contact: bellarinseth@gmail.com
