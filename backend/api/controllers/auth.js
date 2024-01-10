const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const resourcesSchema = require('../../models/user');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!name || !email || !password || !validator.isEmail(email) || !passwordRegex.test(password)) return res.status(400).json({ status: false, message: 'Invalid Data' });
        const user = await resourcesSchema.findOne({ email });
        if (user) return res.status(400).json({ status: false, message: 'Email already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new resourcesSchema({ _id: new mongoose.Types.ObjectId, name, email, password: hashedPassword })
        newUser.save();
        res.status(201).json({ status: true, message: 'User Successfully Registered' });
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Failed to Reguster' });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || !validator.isEmail(email)) return res.status(400).json({ status: false, message: 'Invalid Data' });
        const user = await resourcesSchema.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: false, message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET_KEY);
        user.activeToken = token;
        await user.save();
        res.status(200).json({ status: true, message: 'Login successful.', token });
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Failed to login' });
    }
}


exports.logout = async (req, res, next) => {
    try {
        const userId = req.userData; // Assuming userId is extracted from the token

        if (!userId) {
            return res.status(401).json({ status: false, message: 'User not logged in' });
        }
        const updatedUser = await resourcesSchema.findByIdAndUpdate(
            userId,
            { $unset: { activeToken: 1 } }, // Unset the activeToken field
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        res.status(200).json({ status: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
