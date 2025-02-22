const validator = require('validator');
const Inquiry = require('../models/InquiryModel'); // Import the Inquiry model

// Create an Inquiry
const createInquiry = async (req, res) => {
  try {
    // Destructure the body of the request
    const { fullName, email, phoneNumber, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number format (simple regex for US phone numbers, adjust as needed)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format. It must be 10 digits.' });
    }


    // Create a new Inquiry document
    const newInquiry = new Inquiry({
      fullName,
      email,
      phoneNumber,
      message,
    });

    // Save the inquiry to the database
    await newInquiry.save();

    // Return the success response
    res.status(200).json({
      message: 'Inquiry submitted successfully!',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all inquiries
const getAllInquiries = async (req, res) => {
	try {
	  // Fetch all inquiries from the database
	  const inquiries = await Inquiry.find();
  
	  // Check if there are no inquiries
	  if (inquiries.length === 0) {
		return res.status(404).json({ message: 'No inquiries found' });
	  }
  
	  // Return the inquiries in the response
	  res.status(200).json({
		message: 'Inquiries fetched successfully!',
		inquiries,
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  };
  

	const countInquiries = async (req, res) => {
		try {
			// Fetch the count of documents in the Inquiry collection
			const count = await Inquiry.countDocuments({});
			res.json({ count }); // Respond with the count
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err.message });
		}
	};

module.exports = { createInquiry, getAllInquiries, countInquiries };
