const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} buffer - Image file buffer from multer
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<object>} - Cloudinary upload result
 */
const uploadToCloudinary = (buffer, folder = 'projecthub') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader. upload_stream(
      {
        folder:  folder,
        transformation: [
          {
            width: 450,
            height:  350,
            crop: 'fill',
            gravity: 'center',
            quality: 'auto: good'
          }
        ],
        format: 'jpg' // Force JPEG format
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          return reject(error);
        }
        console.log('✅ Uploaded to Cloudinary:', result.secure_url);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<object>} - Deletion result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('🗑️ Deleted from Cloudinary:', publicId);
    return result;
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    throw error;
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };