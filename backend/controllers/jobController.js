const Job = require('../models/Job');
const Application = require('../models/Application');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ 
            status: { $ne: 'closed' } 
        })
        .populate('client', 'name email')
        .sort({ createdAt: -1 });
        res.status(200).json({ status: "Success", jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        // client
        const newJob = new Job({ 
            ...req.body, 
            client: req.user._id,
            status: 'open'  
        });
        
        await newJob.save();
        res.status(201).json({ status: "Success", job: newJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyPostedJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ client: req.user._id });
        res.status(200).json({ status: "Success", jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const jobDetails = await Job.findById(jobId);
        if (!jobDetails) return res.status(404).json({ message: "Job not found" });

        const existingApp = await Application.findOne({ job: jobId, applicant: req.user._id });
        if (existingApp) return res.status(400).json({ message: "You have already applied for this job." });

        const newApp = new Application({ 
            job: jobId, 
            applicant: req.user._id,
            client: jobDetails.client  
        });

        await newApp.save();
        res.status(201).json({ status: "Success", message: "Applied successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user._id }) // Fixed .id to ._id
          .populate('job')
          .sort({ createdAt: -1});
          res.status(200).json({status: "Success", applications });
    } catch (error) { 
        res.status(500).json({ status: "Error", message: error.message });
    }
};

exports.getApplicationsForClient = async (req, res) => {
    try {
        const applications = await Application.find({ client: req.user._id})
            .populate('job','title salary location')
            // Maid ki profile detaails added here
            .populate('applicant','name email phone experience skills about')
            .sort({ createdAt: -1});
        res.status(200).json({ status: "Success", applications });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body; 
        const { id } = req.params;   

        const updatedApp = await Application.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );

        if (!updatedApp) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        if (status === 'accepted') {
            await Job.findByIdAndUpdate(updatedApp.job, { status: 'closed' });
            await Application.updateMany(
                {
                    job: updatedApp.job,
                    _id: { $ne: id }
                },
                { status: 'rejected' }
            );
        }
        res.status(200).json({ status: "Success", application: updatedApp });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};