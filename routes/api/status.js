//Curret Status

const express = require('express');
const router = express.Router();

//@route    GET api/status/test
//@desc     Test status route
//@access   Public
router.get('/test' ,(req,res) => res.json({ //res.send= res.json
    msg:'Status Works'
}));

module.exports = router;