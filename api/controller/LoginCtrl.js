const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken'); 

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

   const jwtSecret = 'kyaHal';

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found. Please register.' });
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password. Please try again.' });
        }
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name:user.name
                
            }
        };
        jwt.sign(payload, jwtSecret, { expiresIn: '1hr' }, (err, token) => {
            if (err) throw err;
            // Set the token as a cookie in the response
            res.cookie('token', token, { httpOnly: true });
            // Send success response with a message and user details
            res.json({ message: 'Login successful', user });
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};
