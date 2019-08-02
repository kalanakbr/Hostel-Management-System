const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const notices = require('./routes/api/notices');
const passport = require('passport');
const fileUpload = require('express-fileupload');


const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//DB Config
const db = require('./config/keys').mongoURI ;

//Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/',(req, res) => res.send('Hello!'));

//Passport middleware
app.use(passport.initialize());

//file-upload middleware
app.use(fileUpload());

//Passport config
require('./config/passport')(passport);
//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/notices', notices);

// app.use('/upload', express.static('uploads'));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));