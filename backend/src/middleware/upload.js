const multer = require('multer');

// Use memory storage (stores file in buffer, not disk)
const storage = multer. memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(file. originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    console.log('✅ File type accepted:', file. originalname);
    return cb(null, true);
  } else {
    console.log('❌ File type rejected:', file. originalname);
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage: storage, // Memory storage
  limits:  { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

module.exports = upload;