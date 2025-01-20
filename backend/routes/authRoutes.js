const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const router = express.Router();

const jwtSecret = crypto.randomBytes(32).toString('base64');
console.log('Generated JWT Secret:', jwtSecret);

// Register Endpoint
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword, // Store hashed password
            role: 'user', // Default role
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({             
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
