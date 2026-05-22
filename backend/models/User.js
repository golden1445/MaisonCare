const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add  password'],
        minlength: 6,
        select: false 
    },
    role: {
        type: String,
        enum: ['client', 'maid', 'admin'],
        default: 'client'
    },

    pincode: {
    type: String,
    required: [true, "Pincode is required"],
    trim: true
},
zone: {
    type: String,
    default: "Delhi General"
},
phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    trim: true,
    validate: {
        validator: function(v) {
            // only 10 digits allowed,no letters
            return /^\d{10}$/.test(v); 
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
    }
},
    
    //  MAID SPECIFIC FIELDS 
    address: { type: String },
    category: { type: String }, 
    experience: { type: String }, 
    skills: { 
        type: [String],
        default: []
    },
    profileImage: { type: String }, 
    aadharNumber: { type: String }, // String for aadhar number
    panCard: { type: String },      // for pan card 
    policeVerification: { type: String }, 

    // VERIFICATION 
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    rejectionReason: { 
        type: String, 
        default: '' 
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);