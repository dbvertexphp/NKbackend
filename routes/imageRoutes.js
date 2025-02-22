const express = require('express');
const router = express.Router();
const { uploadHeroImage, uploadBackgroundImage, uploadProjectImage, updateHeroImage, updateBackgroundImage, updateProjectImage } = require('../controllers/imageController');
const upload = require('../middlewares/uploadMiddleware'); // Import multer middleware

// Upload routes
router.post('/upload/hero', upload.single('image'), uploadHeroImage); // Hero Image Upload
router.post('/upload/background', upload.single('image'), uploadBackgroundImage); // Background Image Upload
router.post('/upload/project', upload.single('image'), uploadProjectImage); // Project Image Upload

// Update Routes
router.put('/update/hero/:id', upload.single('image'), updateHeroImage);
router.put('/update/background/:id', upload.single('image'), updateBackgroundImage);
router.put('/update/project/:id', upload.single('image'), updateProjectImage);

module.exports = router;
