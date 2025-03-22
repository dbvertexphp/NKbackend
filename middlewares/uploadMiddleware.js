const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define directories for hero and background images
const heroImageDir = path.join(__dirname, '../uploads/heroimage');
const backgroundImageDir = path.join(__dirname, '../uploads/backgroundimage');
const projectImageDir = path.join(__dirname, '../uploads/projectimage');

// Create directories if they don't exist
if (!fs.existsSync(heroImageDir)) {
  fs.mkdirSync(heroImageDir, { recursive: true });
}
if (!fs.existsSync(backgroundImageDir)) {
  fs.mkdirSync(backgroundImageDir, { recursive: true });
}
if (!fs.existsSync(projectImageDir)) {
  fs.mkdirSync(projectImageDir, { recursive: true });
}

// Function to decide where to save the image based on route
const getUploadDir = (req) => {
  // Check if the URL path contains 'hero' or 'background' to determine image type
  if (req.originalUrl.includes('hero')) {
    return heroImageDir;
  } else if (req.originalUrl.includes('background')) {
    return backgroundImageDir;
  } else if (req.originalUrl.includes('project')) {
    return projectImageDir;
	} else {
    throw new Error('No valid image type provided');
  }
};

// Define multer storage and file handling logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const uploadDir = getUploadDir(req);  // Get the destination directory
      cb(null, uploadDir);  // Set the destination
    } catch (error) {
      cb(error);  // Pass any error to multer's error handling
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Set the file name to be unique
  }
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF) are allowed.'));
  }
};

// Set up multer upload with limits, file filters, and storage configuration
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter
});

module.exports = upload;
