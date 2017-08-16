const express = require('express');
const router = express.Router();

// 数据模型
const User = require('../models/User');
const Category = require('../models/Categories');
const Content = require('../models/Content');

router.use((req, res, next) => {
  if (req.userInfo.role !== 'admin') {
    // 如果不是管理员
    res.send('对不起，只有管理员才可以进入后台管理');
    return;
  }
  next();
});

/**
 * 后台-登陆
 */
router.get('/', (req, res, next) => {
  res.render('admin/index', {
    userInfo: req.userInfo,
    type: 'index'
  });
});

/**
 * 用户-管理
 * 从数据库中读取用户列表
 * 限制数据条数
 */
router.get('/user', (req, res, next) => {
  let page = Math.abs(parseInt(req.query.page)) || 1;
  let limit = 5;
  User.count().then(count => {
    // 总数除以限制条数 向上取值 最小为1页
    let pages = Math.ceil(count / limit) || 1;
    // 取当前页面或者总页面的最小值
    page = Math.min(page, pages);
    let skip = (page - 1) * limit;
    User.find().skip(skip).limit(limit).sort({_id: -1}).then(doc => {
      res.render('admin/user_index', {
        userInfo: req.userInfo,
        users: doc,
        count: count,
        page: page,
        limit: limit,
        pages: pages,
        type: 'user'
      })
    })
  })
});

/**
 * 分类-首页
 */
router.get('/category', (req, res, next) => {
  let page = Math.abs(parseInt(req.query.page)) || 1;
  let limit = 5;
  Category.count().then(count => {
    // 总数除以限制条数 向上取值 最小为1页
    let pages = Math.ceil(count / limit) || 1;
    // 取当前页面或者总页面的最小值
    page = Math.min(page, pages);
    let skip = (page - 1) * limit;
    Category.find().skip(skip).limit(limit).sort({_id: -1}).then(doc => {
      res.render('admin/category_index', {
        userInfo: req.userInfo,
        categorise: doc,
        count: count,
        page: page,
        limit: limit,
        pages: pages,
        type: 'category'
      })
    })
  })
});

/**
 * 分类-增加
 */
router.get('/category/add', (req, res) => {
  return res.render('admin/category_add', {
    userInfo: req.userInfo,
    type: 'category'
  })
});

/**
 * 分类-修改
 */
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
      category: doc,
      type: 'category'
    });
  })
});

/**
 * 内容-首页
 */
router.get('/content', (req, res) => {
  // 当前页数
  let page = Math.abs(parseInt(req.query.page)) || 1;
  let limit = 5;
  Content.count().then(count => {
    // 总页数=总数/限制条数 向上取值 最小为1页
    let pages = Math.ceil(count / limit) || 1;
    // 取当前页面或者总页面的最小值
    page = Math.min(page, pages);
    let skip = (page - 1) * limit;
    // populate方法是mongdb的关联查询语法
    Content.find().skip(skip).limit(limit).sort({_id: -1}).populate(['category','user']).then(contents => {
      return res.render('admin/content_index', {
        userInfo: req.userInfo,
        contents: contents,
        count: count,
        page: page,
        limit: limit,
        pages: pages,
        type: 'content'
      });
    });
  });
});


/**
 * 内容-增加
 */
router.get('/content/add', (req, res) => {
  Category.find().sort({_id: -1}).then(categorise => {
    return res.render('admin/content_add', {
      userInfo: req.userInfo,
      categorise: categorise,
      type: 'content'
    });
  })
});

/**
 * 文章-修改
 */

router.get('/content/edit', (req, res) => {
  let id = req.query.id || '';
  // 读取类别
  let categoryDef= Category.find().sort({_id: -1});
  let contentDef =  Content.findOne({_id: id});
  categoryDef.then(categorise=>{
    contentDef.then(content => {
      if (!content) {
        // 内容不存在
        return res.render('admin/error', {
          userInfo: req.userInfo,
          message: '指定内容不存在'
        })
      }else{
        // 内容存在
        return res.render('admin/content_edit', {
          userInfo: req.userInfo,
          content: content,
          categorise:categorise
        })
      }
    })
  });
});


module.exports = router;