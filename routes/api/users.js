//login 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const keys =require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:function (req, file, cb){
        cb(null, file.originalname);
    } 
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
    }else{ 
    cb(null, false);
    }
};
 
const upload = multer({ 
    storage: storage,
    limits : {
        fileSize: 1024 * 1024 * 8   
    },
    fileFilter: fileFilter
}); 

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
router.post('/register',upload.single('profilePicture'), (req,res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    //     console.log(req.file);
    User.findOne({ regNo: req.body.regNo})
    .then(user => {
        if(user) {
            errors.regNo =' Register Number already exists'
            return res.status(400).json({ errors});
        } else{
            const newUser = new User ({
                name: req.body.name,
                regNo: req.body.regNo,
                faculty: req.body.faculty,
                hall: req.body.hall,
                contactNo:req.body.contactNo,
                guardianName:req.body.guardianName,
                guardianTel:req.body.guardianTel,
                password: req.body.password,
                profilePicture: req.file.path
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
});

//@route    POST api/users/login
//@desc     Login User / Returning JWT Token
//@access   Public
router.post('/login',(req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const regNo = req.body.regNo;
    const password = req.body.password;

    //Find user by email
    User.findOne({regNo})
        .then(user => {
            //Check for user
            if(!user){
                errors.regNo ='User not found';
                return res.status(404).json(errors);
            }

            //Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //User Matched
                        // res.json({msg : 'Success'});
                        
                        //Create JWT payload
                        const payload ={
                            id: user.id,
                            name: user.name,
                            faculty:user.faculty,
                            regNo:user.regNo,
                            contactNo:user.contactNo,
                            guardianTel:user.guardianTel,
                            profilePicture: user.profilePicture
                        } ;
                        //Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn:3600},
                            (err,token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                        });
                    } else{
                        errors.password='Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        });
});

//@route    GET api/users/current
//@desc     Return current user
//@access   Private
router.get('/current', passport.authenticate('jwt',{ session: false}),(req, res) =>{
     res.json({
        id:req.user.id,
        name:req.user.name,
        regNo:req.user.regNo,
        faculty:req.user.faculty,
        hall:req.user.hall,
        contactNo:req.user.contactNo,
        guardianTel:req.user.guardianTel,
        profilePicture:req.user.profilePicture
     });
});
module.exports = router;