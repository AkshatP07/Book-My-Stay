const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
currPlace: {
    type:mongoose.Schema.Types.ObjectId, required:true
},
client: {
    type:mongoose.Schema.Types.ObjectId, ref: 'User',
},
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },

  numberOfNights: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
