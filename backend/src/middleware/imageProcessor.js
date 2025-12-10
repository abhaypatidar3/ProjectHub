const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

const processImage = async (req, res, next) => {
  try {
    console.log('\n📸 ===== IMAGE UPLOAD STARTED =====');

    // Check if cropped image data exists (sent as base64)
    if (req.body.croppedImage) {
      console.log('✂️ Processing cropped image from base64...');
      console.log('📏 Base64 data length:', req.body.croppedImage.length);

      // Upload base64 directly to Cloudinary
      const result = await uploadToCloudinary(req.body.croppedImage);

      req.cloudinaryResult = {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      };

      console.log('✅ Cropped image uploaded');
      console.log('📏 Final dimensions:', result.width, 'x', result.height);
      console.log('🔗 Cloudinary URL:', result.secure_url);
      console.log('===== IMAGE UPLOAD COMPLETED =====\n');

      return next();
    }

    // Check if regular file upload exists
    if (! req.file) {
      console.log('⚠️ No file or cropped image in request');
      return next();
    }

    console.log('📁 Processing regular file upload...');
    console.log('📝 Original file:', req.file.originalname);
    console.log('📏 Original size:', (req.file.size / 1024).toFixed(2), 'KB');

    if (!req.file.buffer) {
      throw new Error('File buffer is missing');
    }

    // Upload buffer to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    req.cloudinaryResult = {
      url: result.secure_url,
      publicId: result. public_id,
      width:  result.width,
      height: result.height,
      format: result.format,
      size: result.bytes
    };

    console.log('✅ File uploaded');
    console.log('===== IMAGE UPLOAD COMPLETED =====\n');

    next();
  } catch (error) {
    console.error('\n❌ ===== IMAGE UPLOAD ERROR =====');
    console.error('Error:', error.message);
    console.error('=====================================\n');

    return res.status(500).json({
      message: 'Error uploading image to cloud storage',
      details: error.message
    });
  }
};

module.exports = processImage;