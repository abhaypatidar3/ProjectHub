// backend/src/utils/urlHelper.js
const getUploadUrl = (filePath) => {
  if (!filePath) return '';
  
  // If it's already an absolute URL, return as-is
  if (/^https?:\/\//i.test(filePath)) {
    return filePath;
  }

  // Clean up the path:  remove leading slashes and "uploads/" prefix
  const filename = filePath
    .replace(/^\/+/, '')           // Remove leading slashes
    . replace(/^uploads\/?/i, '');  // Remove "uploads/" prefix if present

  // Get base URL from environment variable (set in Render)
  const base = (process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`)
    .replace(/\/+$/, ''); // Remove trailing slashes

  return `${base}/uploads/${filename}`;
};

module.exports = { getUploadUrl };