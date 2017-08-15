const express = require('express');
const router = express.Router();

const Category = require('../models/Categories');


router.get('/', (req, res, next) => {
    Category.find().then(categories => {
        res.render('main/index.html', {
            userInfo: req.userInfo,
            categories: categories
        })
    })
});


module.exports = router;