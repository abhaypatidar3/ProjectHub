const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    // Just move the file, no processing
    const finalFilename = Date.now() + '-' + req.file.originalname;
    const finalPath = path. join(uploadsDir, finalFilename);

    // Simply rename/move the file
    fs.renameSync(req.file.path, finalPath);

    // Update req.file
    req.file.path = finalPath;
    req.file. filename = finalFilename;

    console.log('✅ Image uploaded:', finalFilename);
    next();

  } catch (error) {
    console.error('❌ Upload error:', error);
    
    if (req.file && req.file.path && fs.existsSync(req. file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    return res.status(500).json({ 
      message: 'Error uploading image',
      details: error.message
    });
  }
};

module.exports = processImage;