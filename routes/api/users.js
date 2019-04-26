//login 
const express = require('express');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

//Load User model
const User  = require('../../models/User');


//@route    GET api/users/test
//@desc     Test users route
//@access   Public
router.get('/test' ,(req,res) => res.json({ //res.send= res.json
    msg:'User Works'
}));

//@route    POST api/users/register
//@desc     Register user
//@access   Public
router.post('/register', (req,res) => {
    User.findOne({ regNo: req.body.regNo})
    .then(user => {
        if(user) {
            return res.status(400).json({ regNo :' Register No. already exists'});
        } else{
            const newUser = new User ({
                regNo: req.body.regNo,
                name: req.body.name,
                password: req.body.password,
                picture
            })
        }
    })
})

module.exports = router;