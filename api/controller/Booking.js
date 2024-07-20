const Booking = require("../models/BookingSch");
const jwt = require('jsonwebtoken');
const jwtSecret = 'kyaHal';

exports.booking = async(req,res) =>{
    console.log('Received POST request at /booking');
    const { token } = req.cookies;
    const {currPlace,checkIn,checkOut,guestCount,numberOfNights,name,mobile} = req.body;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        const user = decoded.user;
        const client = user.id;

        const newBooking = new Booking({ currPlace,checkIn,checkOut,guestCount,numberOfNights,name,mobile,client });
        await newBooking.save();
        res.json({ message: 'Booking successful',data:newBooking});
    }
    catch(error){
        console.error('Error Booking Stay', error);
        res.status(500).json({ message: 'Error Booking Stay', error });
    }
}