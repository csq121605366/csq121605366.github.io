const express = require('express');
const router = express.Router();

const Category = require('../models/Categories');
const Content = require('../models/Content');

let data = {};
// 处理通用数据
router.use((req, res, next) => {
  data.userInfo = req.userInfo;
  data.categories = [];
  Category.find().then(categories => {
    data.categories = categories;
    next();
  })
});


router.get('/', (req, res, next) => {
  data.contents = '';
  data.page = Number(req.query.page) || 1;
  data.category = req.query.category || '';
  data.limit = 2;
  data.count = 0;
  data.pages = 0;
  let where = {};
  if (data.category) {
    where.category = data.category;
  }
  Content.where(where).count().then(count => {
    data.count = count;
    data.pages = Math.ceil(data.count / data.limit);
    data.page = Math.max(Math.min(data.page, data.pages), 1);
    let skip = (data.page - 1) * data.limit;
    return Content.where(where).find().limit(data.limit).skip(skip).sort({created_time: -1}).populate(['category', 'user']);
  }).then((contents) => {
    data.contents = contents;
    res.render('main/index.html', data)
  })
});


router.get('/view', (req, res) => {
  let contentId = req.query.contentId || '';
  Content.findOne({
    _id: contentId
  }).then(content => {
    data.content = content;
    content.views++;
    content.save();
    res.render('main/view.html', data);
  })
});

module.exports = router;