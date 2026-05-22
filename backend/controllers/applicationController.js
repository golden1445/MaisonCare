const Application = require('../models/Application');
const Job = require('../models/Job');

//  Job Apply logic - FIXED
exports.applyToJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const maidId = req.user.id;

        //  firstly check job exist or not
        const jobDetails = await Job.findById(jobId);
        if (!jobDetails) {
            return res.status(404).json({ status: "Fail", message: "Job not found!" });
        }

        //  Check, maid has already applied for this job or not
        const alreadyApplied = await Application.findOne({ job: jobId, applicant: maidId });
        if (alreadyApplied) {
            return res.status(400).json({ status: "Fail", message: "Already applied!" });
        }

        //  create application
        const application = await Application.create({
            job: jobId,
            applicant: maidId,
            client: jobDetails.client, //required field 
            status: "pending"
        });

        res.status(201).json({ status: "Success", application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  MAID,Fetch Applications FIXED: 'jobs' changed to 'applications' for Frontend
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id })
            .populate('job')
            .sort({ appliedAt: -1 });

        const formattedJobs = applications
            .filter(app => app.job !== null)
            .map(app => ({
                _id: app._id, // Appl. id for mapping
                job: {
                    _id: app.job._id,
                    title: app.job.title,
                    location: app.job.location,
                    salary: app.job.salary,
                },
                status: app.status || "pending",
                date: app.appliedAt
            }));

        // Frontend
        res.status(200).json({ status: "Success", applications: formattedJobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// For Client applications , No changes
exports.getApplicationsForClient = async (req, res) => {
    try {
        const myJobs = await Job.find({ client: req.user.id });
        const jobIds = myJobs.map(job => job._id);
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate('job', 'title')
            .populate('applicant', 'name email');
        res.json({ status: "Success", applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};