const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/database');
const { registerUser } = require('./controller/UserController'); // Import the controller
const { loginUser } = require('./controller/LoginCtrl');
const { profileCtrl } = require('./controller/ProfileCtrl');
const cookieParser = require('cookie-parser');
const { imgLinkDownload } = require('./controller/UploadByUrl');
const { AddStay } = require('./controller/AddStay');
const { myStay } = require('./controller/MyStays');
const { updateStay } = require('./controller/UpdateStay'); // Import the updateStay controller
const { places } = require('./controller/Places');
const { booking } = require('./controller/Booking');
const { getBookingById } = require('./controller/MyBooking');
const { AllBookings } = require('./controller/AllBookings');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

dbConnect();

app.get('/', (req, res) => { res.send('Hello, World!'); });
app.get('/profile', profileCtrl);
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/Upload-by-url', imgLinkDownload);
app.post('/hostAdd', AddStay);
app.post('/booking', booking);
app.get('/places', places);
app.get('/myStays', myStay);
app.get('/allBookings', AllBookings);
app.get('/myBooking/:id', getBookingById); // Change the route to use a dynamic parameter for user ID
app.put('/hostUpdate/:id', updateStay); // Add the new PUT route for updating stays
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
