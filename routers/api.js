const express = require('express');
const router = express.Router();

/**
 * 引入模型
 */
const User = require('../models/User');


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
            resData.message = '该账号存在';
            return res.json(resData);
        }
        //保存用户注册信息到数据库中
        let user = new User({
            username: username,
            password: password
        });
        user.save((err, doc) => {
            if (err) {
                resData.code = 400;
                resData.message = '数据库写入出现问题';
                return res.json(resData);
            } else {
                resData.code = 200;
                resData.message = '注册成功';
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
                    _id:doc._id,
                    username: doc.username
                };
                req.cookies.set('userInfo',JSON.stringify(resData.userInfo));
                return res.json(resData);
            }
        })
    }
});


module.exports = router;