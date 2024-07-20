
const User = require('../models/user');
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    console.log('Received POST request at /register');
    const { name, email, password, dob, phoneNumber } = req.body;
    
    let hashPass;
    try{
        hashPass = await bcrypt.hash(password,10);
    }
    catch(err){
        return res.status(500).json(
            {
                success:false,
            }
        )
    }
    console.log('Request data:', { name, email, password:hashPass, dob, phoneNumber });

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email Already register. Kindly LogIn' });
        }
        const user2 = await User.findOne({ phoneNumber});
        if (user2) {
            return res.status(400).json({ message: 'PhoneNo. Already register. Kindly LogIn' });
        }

        const newUser = new User({ name, email, password:hashPass, dob, phoneNumber });
        await newUser.save();
        
        res.json({ message: 'Registration successful', data: newUser });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};
