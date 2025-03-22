const upload = require("../middlewares/uploadMiddleware"); // Import multer middleware
const fs = require("fs");
const path = require("path");
const Image = require("../models/ImageModel"); // Import the Image model

// Handle Hero Image Upload (for first time)
const uploadHeroImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save image metadata to the database
    const newImage = new Image({
      imageType: "hero",
      filename: req.file.filename,
      filepath: `/uploads/backgroundimage/${req.file.filename}`, // ✅ Save Relative Path
      fileSize: req.file.size,
    });

    // Save to database
    await newImage.save();

    res.status(200).json({
      message: "Hero image uploaded and saved to database successfully!",
      file: req.file,
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get Hero Image
const getHeroImage = async (req, res) => {
  try {
    const heroImage = await Image.findOne({ imageType: "hero" });

    if (!heroImage) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    // Convert local file path to a public URL
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/heroimage/${path.basename(heroImage.filepath)}`;

    res.json({
      image: {
        _id: heroImage._id,
        filename: heroImage.filename,
        filepath: imageUrl, // Return a public URL
      },
    });
  } catch (error) {
    console.error("Error fetching hero image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get Backkground Image
const getBackgroundImage = async (req, res) => {
  try {
    const backgroundImage = await Image.findOne({ imageType: "background" });

    if (!backgroundImage) {
      return res.status(404).json({ message: "Background image not found" });
    }

    // Convert local file path to a public URL
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/backgroundimage/${path.basename(backgroundImage.filepath)}`;

    res.json({
      image: {
        _id: backgroundImage._id,
        filename: backgroundImage.filename,
        filepath: imageUrl, // Return a public URL
      },
    });
  } catch (error) {
    console.error("Error fetching background Image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Handle Background Image Upload (for first time)
const uploadBackgroundImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save image metadata to the database
    const newImage = new Image({
      imageType: "background",
      filename: req.file.filename,
      filepath: `/uploads/backgroundimage/${req.file.filename}`, // ✅ Save Relative Path
      fileSize: req.file.size,
    });

    // Save to database
    await newImage.save();

    res.status(200).json({
      message: "Background image uploaded and saved to database successfully!",
      file: req.file,
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// get Project Image
const getProjectImages = async (req, res) => {
  try {
    const projectImages = await Image.find({ imageType: "project" });

    if (!projectImages || projectImages.length === 0) {
      return res.status(404).json({ message: "No project images found" });
    }

    // Convert local file paths to public URLs
    const images = projectImages.map((image) => ({
      _id: image._id,
      filename: image.filename,
      filepath: `${req.protocol}://${req.get(
        "host"
      )}/uploads/projectimage/${path.basename(image.filepath)}`,
    }));

    res.json({ images });
  } catch (error) {
    console.error("Error fetching project images:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Handle Project Image Upload (for first time)
const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Save image metadata to the database
    const newImage = new Image({
      imageType: "project",
      filename: req.file.filename,
      filepath: `/uploads/projectimage/${req.file.filename}`, // ✅ Save Relative Path
      fileSize: req.file.size,
    });

    // Save to database
    await newImage.save();

    res.status(200).json({
      message: "Project image uploaded and saved to database successfully!",
      file: req.file,
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const updateHeroImage = async (req, res) => {
  try {
		if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get the image ID from the URL params
    const { id } = req.params;

    // Find the existing image by ID
    const existingImage = await Image.findById(id);

    // If no existing image is found, return an error
    if (!existingImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete the old image file from the server
    const oldImagePath = path.join(__dirname, `../${existingImage.filepath}`);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath); // Delete the old image file
    }

    // Update the image metadata in the database
    existingImage.filename = req.file.filename;
    existingImage.filepath = req.file.path;
    existingImage.fileSize = req.file.size;

    // Save the updated image metadata
    await existingImage.save();

    // Send a success response
    res.status(200).json({
      message: "Hero image updated successfully!",
      file: req.file,
      image: existingImage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const updateBackgroundImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { id } = req.params;

    const existingImage = await Image.findById(id);

    if (!existingImage) {
      return res.status(404).json({ message: "Image not found" });
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
      message: "Background image updated successfully!",
      file: req.file,
      image: existingImage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const updateProjectImage = async (req, res) => {
  try {
		if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { id } = req.params;

    const existingImage = await Image.findById(id);

    if (!existingImage) {
      return res.status(404).json({ message: "Image not found" });
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
      message: "Project image updated successfully!",
      file: req.file,
      image: existingImage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteProjectImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const existingImage = await Image.findById(id);
    if (!existingImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Construct full path to the image file
    const imagePath = path.join(__dirname, `../${existingImage.filepath}`);

    // Check if file exists and delete it
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove image document from database
    await Image.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  uploadHeroImage,
  uploadBackgroundImage,
  uploadProjectImage,
  updateHeroImage,
  updateBackgroundImage,
  updateProjectImage,
  deleteProjectImage,
  getHeroImage,
  getBackgroundImage,
  getProjectImages,
};
