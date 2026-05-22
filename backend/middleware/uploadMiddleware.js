const multer = require('multer');
const path = require('path');

// 1. Storage Configuration 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure,there is file named upload in backend folder
    },
    filename: function (req, file, cb) {
        // File's name should be unique (Current Time + Original Name)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 2. File Filter (only Images and PDFs will be allowed)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);


    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only JPG/JPEG & PDF Files Allowed!'));
    }
};


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit
    fileFilter: fileFilter
});

module.exports = upload;