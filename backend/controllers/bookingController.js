const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const { maidId, serviceDate, address, totalAmount } = req.body;
        if (!maidId || !serviceDate || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBooking = new Booking({
            client: req.user._id,
            maid: maidId,
            serviceDate,
            address,
            totalAmount
        });
        await newBooking.save();
        res.status(201).json({ status: "Success", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        let query = {};
        // Role check- maid and client
        if (req.user.role === 'maid') {
            query = { maid: req.user._id };
        } else {
            query = { client: req.user._id };
        }


        const bookings = await Booking.find(query)
            .populate('client', 'name email')
            .populate('maid', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ status: "Success", bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;
        const booking = await Booking.findOneAndUpdate(
         { _id: bookingId, maid: req.user._id },
            { status: status },
        { new: true }
        );
        if (!booking) return res.status(404).json({ message: "Request not found" });
        res.status(200).json({ status: "Success", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};