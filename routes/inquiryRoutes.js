// routes/inquiryRoutes.js

const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries, countInquiries } = require('../controllers/inquiryController');

// POST route for creating an inquiry
router.post('/inquiries', createInquiry);

// Get All Inquiries Route
router.get('/inquiries', getAllInquiries); 

router.get('/inquiry/count', countInquiries)
module.exports = router;
