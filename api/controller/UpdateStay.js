const Stay = require('../models/stays');
const jwt = require('jsonwebtoken');
const jwtSecret = 'kyaHal';

exports.updateStay = async (req, res) => {
    const { token } = req.cookies;
    const stayId = req.params.id;
    const { title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests,price } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = decoded.user;
        const owner = user.id;

        const stay = await Stay.findOne({ _id: stayId, owner });

        if (!stay) {
            return res.status(404).json({ message: 'Stay not found or you are not the owner' });
        }

        stay.title = title;
        stay.address = address;
        stay.addedPhotos = addedPhotos;
        stay.description = description;
        stay.perks = perks;
        stay.extraInfo = extraInfo;
        stay.checkInTime = checkInTime;
        stay.checkOutTime = checkOutTime;
        stay.maxGuests = maxGuests;
        stay.price = price;

        await stay.save();
        res.json({ message: 'Stay updated successfully' });
    } catch (err) {
        console.error('Error updating stay:', err);
        res.status(500).json({ message: 'Error updating stay', error: err });
    }
}
