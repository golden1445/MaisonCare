const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload'); 
const User = require('../models/User'); 

const { 
    registerUser, 
    loginUser, 
    registerMaid, 
    updateMaidProfile, 
    getAllUsers, 
    deleteUser, 
    searchMaids, 
    getNearbyMaids,
    getMaidsStatus, 
    verifyMaid     
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchMaids);
router.get('/maids', async (req, res) => {
    try {
        const maids = await User.find({ role: 'maid', status: 'Approved' }).select('-password'); 
        res.status(200).json(maids);
    } catch (error) { res.status(500).json({ message: "Error fetching maids" }); }
});

// Protected User Routes
router.get('/nearby-maids', protect, getNearbyMaids); 
router.get('/maid-details/:id', async (req, res) => {
    try {
        const maid = await User.findById(req.params.id).select('-password');
        if (!maid) return res.status(404).json({ message: "Maid not found" });
        res.status(200).json(maid);
    } catch (error) { res.status(500).json({ message: "Server error" }); }
});
router.post('/register-maid', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'policeVerification', maxCount: 1 }]), registerMaid);
router.get('/me', protect, (req, res) => res.json(req.user));
router.put('/update-profile', protect, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'policeVerification', maxCount: 1 }]), updateMaidProfile);

// --- ADMIN ROUTES  ---
// Frontend is calling /admin/..., so we must provide these paths
router.get('/admin/maids-status', protect, admin, getMaidsStatus);
router.post('/admin/verify-maid/:id', protect, admin, verifyMaid);
router.get('/all-users', protect, admin, getAllUsers);
router.delete('/delete-user/:id', protect, admin, deleteUser);

module.exports = router;