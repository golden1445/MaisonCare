const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/admin/maids-status
router.get('/maids-status', protect, admin, async (req, res) => {
    try {
        const maids = await User.find({ role: 'maid' })
            .select('-password') 
            .sort({ createdAt: -1 });

        res.json({ 
            status: "Success", 
            maids 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @route   POST /api/admin/verify-maid/:id
router.post('/verify-maid/:id', protect, admin, async (req, res) => {
    try {
        const { status, reason } = req.body; 
        
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const maid = await User.findById(req.params.id);
        if (!maid) {
            return res.status(404).json({ message: "Maid not found" });
        }

        // Logic fix: Ensure both fields are updated
        if (status === 'Approved') {
            maid.status = 'Approved';
            maid.isVerified = true;
            maid.rejectionReason = ''; 
        } else if (status === 'Rejected') {
            maid.status = 'Rejected';
            maid.isVerified = false;
            maid.rejectionReason = reason || 'Verification failed';
        }

        const updatedMaid = await maid.save(); // Save the updated document

        res.json({ 
            status: "Success", 
            message: `Maid has been ${status}`,
            maid: updatedMaid // Updated data wapas bhejo
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;