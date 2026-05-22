const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/new', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);

router.put('/update-status', protect, updateStatus); 

module.exports = router;