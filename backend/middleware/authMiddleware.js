const jwt = require('jsonwebtoken');
const User = require('../models/User');

   //Authentication  middle-ware
const protect = async (req, res, next) => {
       let token;
  
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // finding user by decoded id and attaching to req.user
            req.user = await User.findById(decoded.id).select('-password');
               if (!req.user) {
                  return res.status(401).json({ message: 'user not found, access denied!' });
            }
            next(); 
        } catch (error) {
            return res.status(401).json({ message: 'Token is not valid, access denied!' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Accss Denied!' });
    }
};

//   admin routes
  const admin = (req, res, next) => {
       // req.user should be set by auth-Middleware before this runs
    if (req.user && req.user.role === 'admin') {
        next(); // if admin,then allow to access
    } else {
          res.status(403).json({ message: 'Only For Admin' });
    }
    
};


module.exports = { protect, admin };