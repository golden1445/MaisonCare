const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    maid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceDate: { type: Date, required: true },

     address: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
        default: 'pending' 
    },
     totalAmount: { type: Number },
      createdAt: { type: Date, default: Date.now }

});

 module.exports = mongoose.model('Booking', BookingSchema);