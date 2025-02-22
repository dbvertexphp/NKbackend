// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Route for creating a new user
router.post('/register', createUser); // POST /api/users (create user)

// Route for logging in a user
router.post('/login', loginUser); // POST /api/login (login user)

module.exports = router;
