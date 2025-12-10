const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Upload image buffer or base64 to Cloudinary
 * @param {Buffer|string} input - Image file buffer from multer or base64 string
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<object>} - Cloudinary upload result
 */
const uploadToCloudinary = (input, folder = 'projecthub') => {
  return new Promise((resolve, reject) => {
    if (!input) {
      return reject(new Error('No image data provided'));
    }

    console.log('📤 Starting Cloudinary upload...');
    console.log('📦 Input type:', Buffer. isBuffer(input) ? 'Buffer' : typeof input);

    // If input is a base64 string
    if (typeof input === 'string') {
      console.log('🖼️ Detected string input (base64)');
      
      if (!input.startsWith('data:image')) {
        return reject(new Error('Invalid base64 format'));
      }

      console.log('☁️ Uploading base64 to Cloudinary.. .');
      
      cloudinary. uploader.upload(
        input,
        {
          folder:  folder,
          resource_type:  'image',
          transformation:  [
            {
              width:  450,
              height:  350,
              crop: 'fill',
              gravity: 'center',
              quality: 'auto:good'  
            }
          ],
          format: 'jpg'
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            return reject(new Error(`Cloudinary upload failed: ${error.message || JSON.stringify(error)}`));
          }

          if (! result || !result.secure_url) {
            return reject(new Error('Cloudinary upload succeeded but no URL returned'));
          }

          console.log('✅ Uploaded to Cloudinary:', result.secure_url);
          console.log('📏 Dimensions:', result.width, 'x', result.height);
          resolve(result);
        }
      );
    } 
    // If input is a Buffer
    else if (Buffer.isBuffer(input)) {
      console.log('📦 Buffer size:', (input. length / 1024).toFixed(2), 'KB');

      const uploadStream = cloudinary. uploader.upload_stream(
        {
          folder:  folder,
          resource_type:  'image',
          transformation:  [
            {
              width:  450,
              height: 350,
              crop: 'fill',
              gravity: 'center',
              quality: 'auto:good'  
            }
          ],
          format: 'jpg'
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            return reject(new Error(`Cloudinary upload failed: ${error.message}`));
          }

          if (! result || !result.secure_url) {
            return reject(new Error('Cloudinary upload succeeded but no URL returned'));
          }

          console.log('✅ Uploaded to Cloudinary:', result.secure_url);
          resolve(result);
        }
      );

      streamifier.createReadStream(input).pipe(uploadStream);
    } 
    else {
      return reject(new Error('Invalid input type. Expected Buffer or base64 string. '));
    }
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