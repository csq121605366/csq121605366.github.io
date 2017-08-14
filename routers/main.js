

const express = require('express');
const router = express.Router();



router.get('/',(req,res,next)=>{
    console.log(req.userInfo);
    res.render('main/index.html',{
        userInfo:req.userInfo
    });
});



module.exports = router;