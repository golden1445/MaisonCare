const adminMiddleware = (req, res, next) => {
    //   req.user will be set by authMiddleware before this runs

    if (req.user && req.user.role === 'admin') {
         next(); // if admin , then give the access.
    }  else   {
         return res.status(403).json({ message: "Access Denied: Admins Only!" });
    }
};
 

     module.exports = adminMiddleware;