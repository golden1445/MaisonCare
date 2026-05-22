const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes'); 
const applicationRoutes = require('./routes/applicationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

//  MIDDLEWARES 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/maisoncare';

mongoose.connect(MONGO_URI)
    .then(() => console.log("DB Connected: MaisonCare Database is Live!"))
    .catch((err) => console.error(" MongoDB Connection Error:", err.message));

//  ROUTES 
app.use('/api/auth', authRoutes); 
app.use('/api/jobs', jobRoutes); 
app.use('/api/applications', applicationRoutes);
app.use('/api/bookings', bookingRoutes); 
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send("MaisonCare Backend Engine is Running!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: "Error", message: "Something went wrong on the server!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});