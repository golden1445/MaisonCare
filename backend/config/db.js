const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Aapke .env se MONGO_URI uthayega
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Error: ${error.message}`);
        process.exit(1); // Agar DB connect nahi hua toh server stop kar do
    }
};

module.exports = connectDB;