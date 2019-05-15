//Curret notice
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Notice model
const Notice = require('../../models/Notice');
const Profile = require('../../models/Profile');

//Validation
const validateNoticeInput = require('../../validation/notice');

//@route    GET api/notice/test
//@desc     Test status route
//@access   Public
router.get('/test' ,(req,res) => res.json({ //res.send= res.json
    msg:'Notice Works'
}));

//@route    GET api/notices
//@desc     Get notices
//@access   Public
router.get('/', (req, res) => {
    Notice.find()
        .sort({ date: -1})
        .then( notices => res.json(notices))
        .catch(err => res.status(404).json({nonoticesfound:'No notices found'}))
    })

//@route    GET api/notices/:id
//@desc     Get notice by id
//@access   Public
router.get('/:id', (req, res) => {
    Notice.findById(req.params.id)
        .then( notice => res.json(notice))
        .catch(err => res.status(404).json({nonoticefound:'No notice found with that ID'}))
    })

//@route    POST api/notices
//@desc     create notice
//@access   Private
router.post('/', passport.authenticate('jwt', { session:false }), (req, res) => {
   const { errors,isValid } = validateNoticeInput(req.body);

   //Check Validation
   if(!isValid){
       //if any errors,send 400 with errors object
       return res.status(400).json(errors);
   }
   
    const newNotice = new Notice({
        text: req.body.text,
        name:req.body.name,
        profilePicture: req.body.profilePicture,
        user:req.user.id        
    });

    newNotice.save().then(notice => res.json(notice));
})

//@route    DELETE api/notice/:id
//@desc     delete notice
//@access   Private
router.delete('/:id', passport.authenticate('jwt', { session:false }), (req,res) => {
    Profile.findOne({ user:req.user.id})
        .then(profile => {
            Notice.findById(req.params.id)
                .then(notice => {
                    //Check for notice owner
                    if(notice.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized:'User not authorized'})
                    }

                    //Delete
                    notice.remove()
                        .then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ noticeNotFound:'No notice found'}));
        })
})

module.exports = router;