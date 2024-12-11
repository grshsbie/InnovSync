// Auth Controller
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

/*
To test registration in Postman:
1. Set request method to POST
2. URL: http://localhost:YOUR_PORT/api/auth/register
3. Set Headers:
   Content-Type: application/json
4. Set Body to raw JSON:
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
}
5. Send request - should return 201 status with success message
*/

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

/*
To test login in Postman:
1. Set request method to POST
2. URL: http://localhost:YOUR_PORT/api/auth/login
3. Set Headers:
   Content-Type: application/json
4. Set Body to raw JSON:
{
    "email": "john@example.com",
    "password": "password123"
}
5. Send request - should return JWT token on success
*/

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).send('Server error');
    }
};