const express = require('express');
const router = express.Router();

/**
 * 引入模型
 */
const User = require('../models/User');
const Category = require('../models/Categories');

/**
 * 统一返回格式
 */
let resData;

router.use((req, res, next) => {
  resData = {
    status: 200,
    message: '出现错误',
    data: {},
  };
  next();
});

/**
 * 用户注册
 *   注册逻辑
 *     用户名不能为空
 *     密码不能为空
 *     两次密码不一致
 *
 *
 */
router.post('/user/register', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let repassword = req.body.repassword;
  if ((username || password || repassword) === '') {
    resData.code = 400;
    resData.message = "请输入账号或密码";
    return res.json(resData);
  } else if (password !== repassword) {
    resData.code = 400;
    resData.message = "两次密码不同";
    return res.json(resData);
  }
  // 数据库查询
  User.findOne({
    username: username
  }).then(doc => {
    // 表示数据库中有数据
    if (doc) {
      resData.code = 400;
      resData.message = '该账号已存在';
      return res.json(resData);
    }
    //保存用户注册信息到数据库中
    new User({
      username: username,
      password: password,
      role: 'user'
    }).save((err, doc) => {
      if (err) {
        resData.code = 400;
        resData.message = '数据库写入出现问题';
        return res.json(resData);
      } else {
        resData.code = 200;
        resData.message = '注册成功';
        resData.userInfo = {
          _id: doc._id,
          username: doc.username,
          role: doc.role
        };
        // 返回cookie信息
        req.cookies.set('userInfo', JSON.stringify(resData.userInfo));
        return res.json(resData);
      }
    })
  })
});

// 登陆模块
router.post('/user/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if ((username || password) === '') {
    // 账号密码为空
    resData.code = 400;
    resData.message = "请输入账号或密码";
    res.json(resData);
  } else {
    // 查询用户名和密码是否存在
    User.findOne({
      username: username,
      password: password
    }).then(doc => {
      if (!doc) {
        // 用户名密码不存在
        resData.code = 400;
        resData.message = "用户名或密码不正确";
        return res.json(resData);
      } else {
        // 用户名密码存在登陆成功
        resData.code = 200;
        resData.message = "登录成功";
        resData.userInfo = {
          _id: doc._id,
          username: doc.username
        };
        // 返回cookie信息
        req.cookies.set('userInfo', JSON.stringify(resData.userInfo));
        return res.json(resData);
      }
    })
  }
});

/**
 * 退出操作
 */

router.all('/user/logout', (req, res, next) => {
  req.cookies.set('userInfo', null);
  resData.code = 200;
  resData.message = '用户退出成功';
  res.json(resData);
});

/**
 * 文章增加分类
 */

router.post('/category/add', (req, res) => {
  let name = req.body.name;
  if (!name || typeof name !== 'string') {
    resData.code = 400;
    resData.message = '新增分类为空或不可用';
    return res.json(resData);
  } else {
    Category.findOne({
      name: name
    }).then(doc => {
      // 数据库中已经存在该数据
      if (doc) {
        resData.code = 400;
        resData.message = '该文章分类已经存在';
        return res.json(resData);
      } else {
        new Category({
          name: name
        }).save((err, doc) => {
          if (err) {
            resData.code = 400;
            resData.message = '数据库写入出现问题';
            return res.json(resData);
          } else {
            resData.code = 200;
            resData.message = doc.name + '添加成功';
            return res.json(resData);
          }
        })
      }
    });
  }
  
});

/**
 * 文章分类修改
 */

router.post('/category/edit', (req, res, next) => {
  let name = req.body.name || '';
  let id = req.body.id || '';
  if (!name || typeof name !== 'string') {
    resData.code = 400;
    resData.message = '修改分类为空或不可用';
    return res.json(resData);
  } else {
    Category.findOne({
      _id: id
    }).then(doc => {
      // 数据库中已经存在该数据
      if (!doc) {
        resData.code = 400;
        resData.message = '该文章分类不存在';
        return res.json(resData);
      } else {
        // 用户未进行修改
        if (doc.name === name) {
          resData.code = 400;
          resData.message = '您未修改';
          return res.json(resData);
        }
        // 用户进行修改了
        // 查看修改的内容是否已经存在
        Category.findOne({
          _id: {$ne: id},
          name: name
        }).then(doc_same => {
          if (doc_same) {
            resData.code = 400;
            resData.message = '已经存在，修改失败';
            return res.json(resData);
          } else {
            Category.update({
              _id: id
            }, {
              name: name
            }).then(doc_suc => {
              // 完成修改
              resData.code = 200;
              resData.message = doc.name + '==>' + name+'，修改成功';
              return res.json(resData);
            })
          }
        })
      }
    });
  }
});

/**
 * 文章分类删除
 */

router.get('/category/delete', (req, res, next) => {
 // 获取要删除的分类id
  let id = req.query.id||'';
  // 不存在
  if(!id){
    resData.code = 400;
    resData.message = '请输入要删除的分类';
    return res.json(resData);
  }
  // 存在
  Category.findOne({
    _id:id
  }).then(doc=>{
    if(!doc){
      resData.code = 400;
      resData.message = '删除的分类不存在';
      return res.json(resData);
    }
    Category.remove({
      _id:id
    }).then(doc_remove=>{
      resData.code = 200;
      resData.message = '删除的分类成功';
      return res.json(resData);
    })
  })
});




module.exports = router;