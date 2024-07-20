const Stay = require('../models/stays');

exports.places = async(req,res) =>{
    console.log('Received GET request at /places');
    try{
const list = await Stay.find();
res.json(list);
    }
    catch(err){
        console.error('Error fetching stays:', err);
        res.status(500).json({ message: 'Error fetching stays', error: err });
    }
}