const jwt = require('jsonwebtoken'); 
const jwtSecret = 'kyaHal';

exports.profileCtrl =  (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded =  jwt.verify(token, jwtSecret);
        const user = decoded.user;
        res.json({ user });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
