const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const getZoneByPincode = (pincode) => {
    const pin = parseInt(pincode);
    if (pin >= 110001 && pin <= 110010) return "Central Delhi";
    if ((pin >= 110011 && pin <= 110030) || (pin >= 110044 && pin <= 110070)) return "South Delhi";
    if ((pin >= 110031 && pin <= 110043) || (pin >= 110091 && pin <= 110096)) return "East Delhi";
    if (pin >= 110051 && pin <= 110080) return "West Delhi";
    if (pin >= 110081 && pin <= 110110) return "North Delhi";
    return "Delhi General";
};


// 1. Client Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, role, pincode } = req.body;
        if (!name || !phone || !password || !pincode) return res.status(400).json({ status: "Fail", message: "Sabhi fields bharna zaroori hai!" });

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) return res.status(400).json({ status: "Fail", message: "Email ya Phone pehle se register hai!" });


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, phone, password: hashedPassword, role: role || 'client', pincode, zone: getZoneByPincode(pincode) });
        res.status(201).json({ status: "Success", token: generateToken(newUser._id), user: { id: newUser._id, name: newUser.name, phone: newUser.phone, role: newUser.role, zone: newUser.zone } });
    } catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

// 2. Maid Registration
exports.registerMaid = async (req, res) => {
    try {
        const { name, email, phone, password, experience, address, pincode, skills, aadharNumber, registrationID } = req.body;
        
        // Check both email and phone
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) return res.status(400).json({ status: "Fail", message: "Maid already registered with this Email or Phone!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profileImage = req.files?.profileImage ? req.files.profileImage[0].path : '';
        const panCard = req.files?.panCard ? req.files.panCard[0].path : '';
        const policeVerification = req.files?.policeVerification ? req.files.policeVerification[0].path : '';

        let parsedSkills = [];
        if (skills) { try { parsedSkills = typeof skills === 'string' ? JSON.parse(skills) : skills; } catch (e) { parsedSkills = skills.split(',').map(s => s.trim()); } }

        const newMaid = await User.create({ name, email, phone, password: hashedPassword, role: 'maid', experience, address, pincode, zone: getZoneByPincode(pincode), aadharNumber, registrationID, skills: parsedSkills, profileImage, panCard, policeVerification });
        res.status(201).json({ status: "Success", token: generateToken(newMaid._id), user: { id: newMaid._id, name: newMaid.name, role: newMaid.role, registrationID: newMaid.registrationID } });
    } catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

// 3. Login
exports.loginUser = async (req, res) => {
    try {
        const { identifier,email, password, isAdminLogin } = req.body; // 'identifier' can be email or phone
        const loginId = (identifier || email || "").trim();
        const cleanPassword = (password || "").trim();
        if (!loginId || !cleanPassword) {
            return res.status(400).json({status: "Fail", message: "Failed"});
        }
        const  user = await User.findOne({
            $or: [{ email: loginId}, { phone: loginId}]
            }).select('+password');
        if (!user) {
            return res.status(401).json({ status: "Fail", message: "User Not Found!" });
        }
        // Password check
        const isMatch = await bcrypt.compare(cleanPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "Fail", message: "Wrong Password!" });
        }
        if (isAdminLogin && user.role !== 'admin') {
            return res.status(403).json({ status: "Fail", message: "Access Denied!" });
        }
        const token = generateToken(user._id);
        res.json({
            status: "Success",
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                role: user.role,
                status: user.status || 'Pending',
                zone: user.zone
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }

};

// 4. Update Profile & Locked Name & Phone
exports.updateMaidProfile = async (req, res) => {
    try {
        // 'name' and 'phone' removed to prevent editing official details
        const { experience, skills, address, pincode, category } = req.body;
        const userId = req.user.id;

        let updateData = { experience, address, pincode, category };
        
        if (pincode) updateData.zone = getZoneByPincode(pincode);
        
        if (skills) {
            try { updateData.skills = typeof skills === 'string' ? JSON.parse(skills) : skills; } 
            catch { updateData.skills = skills.split(',').map(s => s.trim()); }
        }

        if (req.files) {
            if (req.files.profileImage) updateData.profileImage = req.files.profileImage[0].path;
            if (req.files.panCard) updateData.panCard = req.files.panCard[0].path;
            if (req.files.policeVerification) updateData.policeVerification = req.files.policeVerification[0].path;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        res.status(200).json({ status: "Success", user: updatedUser });
    } catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

// all functions below are for fetching maids, searching maids, admin functions etc. No changes in registration and login logic except phone addition and email/phone login support.
exports.getNearbyMaids = async (req, res) => {
    try {
        const clientZone = req.user.zone;
        const query = { role: 'maid', status: 'Approved' };
        if (clientZone) query.zone = clientZone;
        const maids = await User.find(query).select('-password');
        res.status(200).json({ status: "Success", data: maids });
    } catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

exports.getMe = async (req, res) => {
    try { const user = await User.findById(req.user.id); res.status(200).json(user); } 
    catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getAllUsers = async (req, res) => {
    try { const users = await User.find().select('-password'); res.status(200).json({ status: "Success", users }); } 
    catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

exports.deleteUser = async (req, res) => {
    try { await User.findByIdAndDelete(req.params.id); res.status(200).json({ status: "Success", message: "Deleted!" }); } 
    catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

exports.searchMaids = async (req, res) => {
    try {
         const { address, category } = req.query;
        let query = { role: 'maid' };
        if (address) query.address = { $regex: address, $options: 'i' };
        if (category) query.skills = { $in: [new RegExp(category, 'i')] };
        const maids = await User.find(query).select('-password');
        res.status(200).json({ status: "Success", data: maids });
    } catch (error) { res.status(500).json({ status: "Error", message: error.message }); }
};

//  ADMIN FUNCTIONS 

//  Get Maids Status (For Admin Dashboard)
exports.getMaidsStatus = async (req, res) => {
    try  {
        // fetch all the maids 
        const maids = await User.find({ role: 'maid' }).sort({ createdAt: -1 });
        
        res.status(200).json({ 
            status: "Success", 
            count: maids.length, // total of maids
            maids 
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// for approving or rejecting maid applications
exports.verifyMaid = async (req, res) => {
    try {
        const { status, reason } = req.body;
        const maidId = req.params.id;

        const updatedMaid = await User.findByIdAndUpdate(
            maidId,
            { 
                status: status, //  'Approved' or 'Rejected'
                 isVerified: status === 'Approved',
                rejectionReason: reason || ""
            },
            { new: true }
        );

        res.status(200).json({ status: "Success", maid: updatedMaid });
    }  catch (error) {
     res.status(500).json({ status: "Error", message: error.message });
    }
};