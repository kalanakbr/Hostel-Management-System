const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const inquiry = require('./routes/api/inquiry');
const passport = require('passport');

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

//Passport config
require('./config/passport')(passport);
//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/inquiry', inquiry);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));