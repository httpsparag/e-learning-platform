import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import redisClient from './config/redis';

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Check Cloudinary Configuration
const checkCloudinary = () => {
  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
  const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  
  if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryUploadPreset) {
    console.log(`☁️  CLOUDINARY: ✓ RUNNING (Cloud: ${cloudinaryCloudName})`);
  } else {
    console.log(`☁️  CLOUDINARY: ✗ NOT CONFIGURED - Missing env variables`);
    console.log(`   Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_UPLOAD_PRESET`);
  }
};

checkCloudinary();

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    redisClient.quit();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    redisClient.quit();
    process.exit(0);
  });
});
