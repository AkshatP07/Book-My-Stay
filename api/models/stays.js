const mongoose = require('mongoose');

const staySchema = new mongoose.Schema({
  owner:{type:mongoose.Schema.Types.ObjectId, ref:'User',required: true,},

  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  addedPhotos: {
    type: [String],  
  },
  description: {
    type: String,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  perks: {
    type: [String], // Array of strings to store ticked options like WiFi, etc.
  },
  extraInfo: {
    type: String,
  },
  checkOutTime: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Stay = mongoose.model('Stay', staySchema);

module.exports = Stay;
