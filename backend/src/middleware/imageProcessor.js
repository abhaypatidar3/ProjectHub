const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

const processImage = async (req, res, next) => {
  if (! req.file) {
    return next();
  }

  try {
    console.log('\n📸 ===== IMAGE UPLOAD STARTED =====');
    console.log('📁 Original file:', req.file.originalname);
    console.log('📏 Original size:', (req.file.size / 1024).toFixed(2), 'KB');

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Attach Cloudinary result to request
    req.cloudinaryResult = {
      url: result.secure_url,
      publicId: result.public_id,
      width: result. width,
      height: result. height,
      format: result. format,
      size: result.bytes
    };

    console.log('✅ Processed dimensions:', result.width, 'x', result.height);
    console.log('💾 Processed size:', (result.bytes / 1024).toFixed(2), 'KB');
    console.log('🔗 Cloudinary URL:', result.secure_url);
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