const jwt = require('jsonwebtoken');
const Stay = require('../models/stays');
const jwtSecret = 'kyaHal';

exports.AddStay = async (req, res) => {
    console.log('Received POST request at /hostAdd');
    
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests,price } = req.body;
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = decoded.user;
        const owner = user.id;

        const addStay = new Stay({
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkInTime,
            checkOutTime,
            maxGuests,
            price,
            owner
        });

        await addStay.save();
        res.json({ message: 'Stay added successfully', data: addStay });
        console.log('Stay added successfully');
    } catch (err) {
        console.error('Error verifying token or adding stay:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ message: 'Error adding stay', error: err });
    }
};
