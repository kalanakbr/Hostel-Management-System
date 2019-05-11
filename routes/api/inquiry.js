//Curret inquiry

const express = require('express');
const router = express.Router();

//@route    GET api/inquiry/test
//@desc     Test status route
//@access   Public
router.get('/test' ,(req,res) => res.json({ //res.send= res.json
    msg:'Inquiry Works'
}));

module.exports = router;