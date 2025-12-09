const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const processedFilename = 'processed-' + Date.now() + path.extname(req.file. originalname);
    const processedImagePath = path.join(uploadsDir, processedFilename);
    
    console.log('Processing image:', req.file.path);
    console.log('Output path:', processedImagePath);

    // Crop and resize image to 450x350
    await sharp(req.file.path)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(processedImagePath);

    // Delete original file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req. file.path);
    }

    // Update req.file with processed image info
    req.file.path = processedImagePath;
    req.file.filename = processedFilename;

    console.log('Image processed successfully:', processedFilename);
    next();
  } catch (error) {
    console.error('Image processing error:', error);
    return res.status(500).json({ message: 'Error processing image:  ' + error.message });
  }
};

module.exports = processImage;