const mongoose = require('mongoose');
const User = require('./User');

const JobSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Role must be 'client'
        required: true
    },
    title: { type: String, required: true },
    category: { 
        type: [String], 
        required: true, 
        //enum: ['Cleaning', 'Cooking', 'Nanny', 'Elderly Care'] 

    },
    description: { type: String, required: true },
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary cannot be negative!']

    },
    location: { type: String, required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Hourly'], default: 'Full-time' },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model('Job', JobSchema);