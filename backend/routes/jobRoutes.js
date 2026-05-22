const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect, admin } = require('../middleware/authMiddleware');
const Job = require('../models/Job');
 //protected ROutes
 router.post('/post-job', protect, jobController.createJob);
 router.get('/my-jobs', protect,jobController.getMyPostedJobs);

 //Maid routes
   router.get('/my-applications', protect, jobController.getMyApplications);
   router.post('/apply/:id', protect,jobController.applyToJob);
 



   //client routes
   router.get('/client-applications',protect,jobController.getApplicationsForClient);
   router.put('/application-status/:id', protect, jobController.updateApplicationStatus);
/*
   //admin routes
   router.get('/all-jobs', protect, admin, async (req, res) => {
    try {
        const jobs = await Job.find().populate('client', 'name email');
         res.status(200).json({ status: "Success", jobs: jobs});
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs"});
        console.error("Backend Error Detail:", error.message);
    }
   });*/
   router.get('/all-jobs', protect, jobController.getAllJobs);
   
   module.exports = router;