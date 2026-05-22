const express = require('express');
const router = express.Router();
const { applyToJob, getApplicationsForClient } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// Maid apply karegi (Job ID URL parameter se jayegi)
router.post('/apply/:id', protect, applyToJob);

// Client apni applications dekhega
router.get('/my-applications', protect, getApplicationsForClient);

module.exports = router;