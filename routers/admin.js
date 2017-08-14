const express = require('express');
const router = express.Router();

/**
 * 统一返回格式
 */
let resData;

router.use((req, res, next) => {
    resData = {
        status: 200,
        message: ''
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
    if (username == '' || password == '' || repassword == '') {
        // 用户发出的请求错误
        resData.status = 400;
        resData.message = "请输入账号或密码";
    }
    res.status(resData.status).json(resData);
    return resData;
});


module.exports = router;