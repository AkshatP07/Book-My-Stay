const jwt = require('jsonwebtoken');
const Stay = require('../models/stays');
const jwtSecret = 'kyaHal';

exports.myStay = async (req, res) => {
  console.log('Received GET request at /myStays');

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = decoded.user;
    const owner = user.id;
    const Myplaces = await Stay.find({ owner }); 
    res.json(Myplaces); 
  } catch (err) {
    console.error('Error verifying token or fetching stays:', err);
    res.status(500).json({ message: 'Error fetching stays', error: err });
  }
};
