//Display profile

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Model
const User = require('../../models/User');


//Load Input Validation
const validateProfileInput = require('../../validation/profile');
const validateLeaveInput = require('../../validation/leave');


//@route    GET api/profile/test
//@desc     Test profile route
//@access   Public
router.get('/test' ,(req,res) => res.json({ //res.send= res.json
    msg:'Profile Works'
}));

//@route    GET api/profile
//@desc     Get current users profile
//@access   Private
router.get('/',passport.authenticate('jwt',{ session:false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user:req.user.id })
        .populate('user',['name', 'profilePicture'])
        .then(profile => {
            if(!profile){
                errors.noprofile='There is no profile for this user';
                 return res.status(404).json(errors);
            }
            res.json(profile); 
        })
            .catch(err => res.status(404).json(err));
}) ; 

//@route    POST api/profile
//@desc     Create or Edit users profile
//@access   Private
router.post('/',passport.authenticate('jwt',{ session:false }), (req, res) => {
  const { errors,isValid } = validateProfileInput(req.body);

  //Check Validation
  if(!isValid){
      //return any errors with 400 status
      return res.status(400).json(errors);
  }
  
    //Get fields
   const profileFields = {};
   profileFields.user= req.user.id;
   
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.regNo) profileFields.regNo = req.body.regNo;
   if(req.body.faculty) profileFields.faculty = req.body.faculty;
   if(req.body.course) profileFields.course = req.body.course;
   if(req.body.hall) profileFields.hall = req.body.hall;
   if(req.body.roomNo) profileFields.roomNo = req.body.roomNo;
   if(req.body.dob) profileFields.dob = req.body.dob;
   if(req.body.gender) profileFields.gender = req.body.gender;
   if(req.body.NIC) profileFields.NIC = req.body.NIC;
   if(req.body.address) profileFields.address = req.body.address;
   if(req.body.contactNo) profileFields.contactNo = req.body.contactNo;
   if(req.body.guardianName) profileFields.guardianName = req.body.guardianName;
   if(req.body.guardianTel) profileFields.guardianTel = req.body.guardianTel;


   //Split into array
   if(typeof req.body.skills !== 'undefined'){
        profileFields.contactNo = req.body.contactNo.split(',');
   }

   if(typeof req.body.skills !== 'undefined'){
        profileFields.guardianTel = req.body.guardianTel.split(',');
    }   

    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if (profile) {
            //Update
            Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true },
                {useFindAndModify: false}
            )
            .then(profile => res.json(profile));
        } else {
            //Create

            //Check if handle exists
            Profile.findOne({ handle:profileFields.handle })
            .then(profile => {
                if(profile){
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }

                //Save Profile
                new Profile(profileFields)
                    .save()
                    .then(profile => res.json(profile));
            });
        }
    });
});

//@route    GET api/profile/handle/:handle
//@desc     GET profile by handle
//@access   Public 
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle:req.params.handle })
        .populate('user', ['name', 'profilePicture'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
            .catch(err => res.status(404).json(err)
        );
});

//@route    GET api/profile/user/:user_id
//@desc     GET profile by user ID
//@access   Public 
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user:req.params.user_id })
        .populate('user', ['name', 'profilePicture'])
        .then(profile =>{
            if(!profile){
                errors.noprofile='There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
            .catch(err => res.status(404).json({profile:'There is no profile for this user'})
            );
});

//@route    GET api/profile/all
//@desc     GET all profiles
//@access   Public 
router.get('/all', (req,res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'profilePicture'])
    .then(profiles => {
        if(!profiles){
            errors.noprofile = 'There are no Profiles';
            res.status(404).json(errors);
        }
        res.json(profiles);
    })
    .catch(err => res.status(404).json({profile:'There are no Profiles'})
        );
    
});

//@route    POST api/profile/leave
//@desc     Add leaving letter to Profile
//@access   Private
router.post('/leave', passport.authenticate('jwt', {session: false }), (req, res) => {
    const { errors,isValid } = validateLeaveInput(req.body);

    //Check Validation
    if(!isValid){
        //return any errors with 400 status
        return res.status(400).json(errors);
    }
  
   
    Profile.findOne({ user:req.user.id })
        .then( profile => {
            const newLeave = {
                reason: req.body.reason,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description
            }

            //Add to leave array
            profile.leave.unshift(newLeave);

            profile.save().then(profile => res.json(profile));
        })
});

//@route    DELETE api/profile/leave/:leave_id
//@desc     delete leaving letter to Profile
//@access   Private
router.delete('/leave/:leave_id',passport.authenticate('jwt',{ session: false}),
(req,res) => {
    Profile.findOne({ user:req.user.id })
        .then(profile => {
            //Get remove index
            const removeIndex = profile.leave
                .map(item => item.id)
                .indexOf(req.params.leave_id);

                //Splice out of array
                profile.leave.splice(removeIndex, 1);

                //Save
                profile.save()
                    .then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

//@route    DELETE api/profile/
//@desc     Delete user and Profile
//@access   Private
router.delete('/',passport.authenticate('jwt',{ session: false}),
(req,res) => {
    Profile.findOneAndRemove({ user:req.user.id})
        .then(() =>{
            User.findOneAndRemove({ _id:req.user.id})
                .then(() => res.json({ success:true }));
        })
    }
);
module.exports = router; 