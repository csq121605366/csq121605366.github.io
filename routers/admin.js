const express = require('express');
const router = express.Router();

// 用户数据模型
const User = require('../models/User');
// 文章分类数据模型
const Category = require('../models/Categories');
/**
 * 统一返回格式
 */
let resData;

router.use((req, res, next) => {
  if (req.userInfo.role !== 'admin') {
    // 如果不是管理员
    res.send('对不起，只有管理员才可以进入后台管理');
    return;
  }
  next();
});

/**
 * 后台登陆
 */
router.get('/', (req, res, next) => {
  res.render('admin/index');
});

/**
 * 用户管理
 * 从数据库中读取用户列表
 * 限制数据条数
 */
router.get('/user', (req, res, next) => {
  let page = Math.abs(parseInt(req.query.page)) || 1;
  let limit = 5;
  User.count().then(count => {
    // 总数除以限制条数 向上取值
    let pages = Math.ceil(count / limit);
    // 取当前页面或者总页面的最小值
    page = Math.min(page, pages);
    let skip = (page - 1) * limit;
    User.find().skip(skip).limit(limit).then(doc => {
      res.render('admin/user_index', {
        userInfo: req.userInfo,
        users: doc,
        count: count,
        page: page,
        limit: limit,
        pages: pages
      })
    })
  })
});

/**
 * 分类首页
 */
router.get('/category', (req, res, next) => {
  let page = Math.abs(parseInt(req.query.page)) || 1;
  let limit = 5;
  Category.count().then(count => {
    // 总数除以限制条数 向上取值
    let pages = Math.ceil(count / limit);
    // 取当前页面或者总页面的最小值
    page = Math.min(page, pages);
    let skip = (page - 1) * limit;
    Category.find().skip(skip).limit(limit).then(doc => {
      res.render('admin/category_index', {
        userInfo: req.userInfo,
        categorise: doc,
        count: count,
        page: page,
        limit: limit,
        pages: pages
      })
    })
  })
});

router.get('/category/edit', (req, res) => {
  let id = req.query.id || '';
  // 获取要修改的分类信息
  Category.findOne({
    _id: id
  }).then(doc => {
    if (!doc) {
      return;
    }
    return res.render('admin/category_edit', {
      userInfo: req.userInfo,
      category: doc
    });
  })
});



module.exports = router;