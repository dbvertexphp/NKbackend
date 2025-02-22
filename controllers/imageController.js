const upload = require('../middlewares/uploadMiddleware'); // Import multer middleware
const fs = require('fs');
const path = require('path');
const Image = require('../models/ImageModel'); // Import the Image model

// Function to delete the old image from the server (if exists)
const deleteOldImage = async (imageType) => {
  try {
    // Find the image with the given type, assuming only one image type per kind (hero, background, project)
    const existingImage = await Image.findOne({ imageType });

    if (existingImage) {
      // Delete the old image file from the server
      const oldImagePath = path.join(__dirname, '..', existingImage.filepath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);  // Delete the file from the server
      }

      // Delete the old image metadata from the database
      await Image.deleteOne({ _id: existingImage._id });
    }
  } catch (error) {
    console.error('Error while deleting old image:', error);
  }
};

// Handle Hero Image Upload (for first time)
const uploadHeroImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save image metadata to the database
    const newImage = new Image({
      imageType: 'hero',
      filename: req.file.filename,
      filepath: req.file.path, // Path where the image is saved on the server
      fileSize: req.file.size
    });

    // Save to database
    await newImage.save();

    res.status(200).json({
      message: 'Hero image uploaded and saved to database successfully!',
      file: req.file,
      image: newImage
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Handle Background Image Upload (for first time)
const uploadBackgroundImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save image metadata to the database
    const newImage = new Image({
      imageType: 'background',
      filename: req.file.filename,
      filepath: req.file.path, // Path where the image is saved on the server
      fileSize: req.file.size
    });

    // Save to database
    await newImage.save();

    res.status(200).json({
      message: 'Background image uploaded and saved to database successfully!',
      file: req.file,
      image: newImage
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Handle Project Image Upload (for first time)
const uploadProjectImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save image metadata to the database
    const newImage = new Image({
      imageType: 'project',
      filename: req.file.filename,
      filepath: req.file.path, // Path where the image is saved on the server
      fileSize: req.file.size
    });

    // Save to database
    await newImage.save();

    res.status(200).json({
      message: 'Project image uploaded and saved to database successfully!',
      file: req.file,
      image: newImage
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const updateHeroImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the image ID from the URL params
    const { id } = req.params;

    // Find the existing image by ID
    const existingImage = await Image.findById(id);

    // If no existing image is found, return an error
    if (!existingImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the old image file from the server
    const oldImagePath = path.join(__dirname, `../${existingImage.filepath}`);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);  // Delete the old image file
    }

    // Update the image metadata in the database
    existingImage.filename = req.file.filename;
    existingImage.filepath = req.file.path;
    existingImage.fileSize = req.file.size;

    // Save the updated image metadata
    await existingImage.save();

    // Send a success response
    res.status(200).json({
      message: 'Hero image updated successfully!',
      file: req.file,
      image: existingImage
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const updateBackgroundImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { id } = req.params;

    const existingImage = await Image.findById(id);

    if (!existingImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const oldImagePath = path.join(__dirname, `../${existingImage.filepath}`);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    existingImage.filename = req.file.filename;
    existingImage.filepath = req.file.path;
    existingImage.fileSize = req.file.size;

    await existingImage.save();

    res.status(200).json({
      message: 'Background image updated successfully!',
      file: req.file,
      image: existingImage
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


const updateProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { id } = req.params;

    const existingImage = await Image.findById(id);

    if (!existingImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const oldImagePath = path.join(__dirname, `../${existingImage.filepath}`);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    existingImage.filename = req.file.filename;
    existingImage.filepath = req.file.path;
    existingImage.fileSize = req.file.size;

    await existingImage.save();

    res.status(200).json({
      message: 'Project image updated successfully!',
      file: req.file,
      image: existingImage
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  uploadHeroImage,
  uploadBackgroundImage,
  uploadProjectImage,
  updateHeroImage,
  updateBackgroundImage,
  updateProjectImage
};
