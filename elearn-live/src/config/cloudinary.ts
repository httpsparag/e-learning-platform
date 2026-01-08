// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dobwvjbt9', // Replace with your Cloudinary cloud name
  UPLOAD_PRESET: 'courses_video', // Replace with your upload preset
  API_KEY: '985769768227642', // Optional, for reference
};

// Cloudinary Upload Options
export const getCloudinaryOptions = () => ({
  cloudName: CLOUDINARY_CONFIG.CLOUD_NAME,
  uploadPreset: CLOUDINARY_CONFIG.UPLOAD_PRESET,
  resourceType: 'video',
  clientAllowedFormats: ['mp4', 'avi', 'mov', 'webm'],
  maxFileSize: 500000000, // 500MB
  folder: 'instructor-courses',
});
