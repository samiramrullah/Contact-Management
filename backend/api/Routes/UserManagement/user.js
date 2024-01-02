const express = require('express');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../../../models/user');

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!name || !email || !password || !validator.isEmail(email) || !passwordRegex.test(password)) return res.status(400).json({ message: 'Invalid Data' });
        const user = await userSchema.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userSchema({ _id: new mongoose.Types.ObjectId, name, email, password: hashedPassword })
        newUser.save();
        res.status(201).json({ message: 'User Successfully Registered' });
    } catch (error) {
        return res.status(401).json({ message: 'Failed to Reguster' });
    }
})

router.get('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || !validator.isEmail(email)) return res.status(400).json({ message: 'Invalid Data' });
        const user = await userSchema.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        return res.status(401).json({ message: 'Failed to login' });
    }
});


module.exports = router;