const Booking = require('../models/BookingSch');

exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id); 
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking retrieved successfully', data: booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};
