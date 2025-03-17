const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Debugging line
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid or expired token' });
//   }
// };


const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded); 

    req.user = { 
      id: decoded.userId,  // ✅ Ensure ID is stored as `id`
      role: decoded.role,
      email: decoded.email
    };

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};


// const isAdmin = (req, res, next) => {
//   if (!req.user || !req.user.role) {
//     return res.status(403).json({ message: 'Access denied: User role not found.' });
//   }

//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied: Admins only.' });
//   }

//   next();
// };


const isAdmin = (req, res, next) => {
  console.log("User Role:", req.user?.role); // Debugging line
  
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: 'Access denied: User role not found.' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  
  next();
};

module.exports = { authenticate, isAdmin };
