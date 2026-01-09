/**
 * Cloudinary Upload Utility
 * Handles video uploads to Cloudinary with server-side signatures for security
 */

export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  duration?: number;
  video?: {
    pix_format: string;
    codec: string;
    level: string;
    profile: string;
    bit_rate: number;
    dar: string;
    time_base: string;
  };
}

interface SignatureResponse {
  signature: string;
  timestamp: number;
  cloudName: string;
  uploadPreset: string;
  apiKey: string;
}

/**
 * Get upload signature from backend
 */
export const getVideoUploadSignature = async (token: string): Promise<SignatureResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/courses/upload/video-signature`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get upload signature: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Got upload signature from backend');
    return data.data;
  } catch (error: any) {
    console.error('❌ Failed to get signature:', error);
    throw new Error(error.message || 'Failed to get upload signature');
  }
};

export const uploadVideoToCloudinary = async (
  file: File,
  signatureData: SignatureResponse
): Promise<CloudinaryUploadResponse> => {
  const { cloudName, uploadPreset, apiKey, signature, timestamp } = signatureData;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration missing');
  }

  if (!file) {
    throw new Error('No file provided for upload');
  }

  // Validate file type
  const validTypes = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    'video/x-flv',
    'video/x-matroska',
  ];

  if (!validTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Supported types: MP4, MOV, AVI, WebM, FLV, MKV`
    );
  }

  // Validate file size (max 500MB)
  const maxSize = 500 * 1024 * 1024; // 500MB in bytes
  if (file.size > maxSize) {
    throw new Error(
      `File size exceeds limit. Maximum size: 500MB, Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    );
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'instructor-courses');
    formData.append('resource_type', 'video');
    formData.append('tags', 'instructor-course');

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    console.log('📤 Starting Cloudinary upload...');
    console.log('   File:', file.name);
    console.log('   Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('   Type:', file.type);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData?.error?.message ||
        `Upload failed with status ${response.status}`;
      console.error('❌ Cloudinary API Error:', {
        status: response.status,
        error: responseData?.error,
      });
      throw new Error(errorMessage);
    }

    console.log('✅ Upload successful!');
    console.log('   Public ID:', responseData.public_id);
    console.log('   URL:', responseData.secure_url);
    console.log('   Duration:', responseData.duration, 'seconds');

    return responseData as CloudinaryUploadResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during video upload');
  }
};

/**
 * Check if Cloudinary is properly configured
 */
export const isCloudinaryConfigured = (cloudName?: string, uploadPreset?: string): boolean => {
  return !!(cloudName && uploadPreset && cloudName.trim() && uploadPreset.trim());
};

/**
 * Get Cloudinary configuration from environment variables
 */
export const getCloudinaryConfig = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  return {
    cloudName,
    uploadPreset,
    isConfigured: isCloudinaryConfigured(cloudName, uploadPreset),
  };
};
