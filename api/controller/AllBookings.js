const Booking = require('../models/BookingSch');
const jwt = require('jsonwebtoken'); 
const jwtSecret = 'kyaHal';

exports.AllBookings = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = decoded.user;
        const clientId = user.id;  // Extract client ID from user

        // Fetch bookings where client matches the user ID
        const bookings = await Booking.find({ client: clientId });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this client' });
        }

        res.json({ message: 'Bookings retrieved successfully', data: bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
