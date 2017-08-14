/**
 * Created by csq on 2017/8/11.
 */

//加载express模块
const express = require('express');
// 创建app应用
const app = express();
const port = 80;
const mongoose = require('mongoose');
const path = require('path');
// 加载body-parser 用于处理post请求的数据
const bodyParser = require('body-parser');
// 加载cookies模块
const Cookies = require("cookies");


// 定义应用模板引擎
// 第一个参数表示模板引擎名称，和后缀
// 第二个参数表示用于处理模板内容的方法
const swig = require('swig');
//模板配置
//定义当前使用的模板引擎，
//第一个参数，模板引擎的名称，同时也是模板文本
//第二个参数解析处理模板内容的函数
app.engine('html', swig.renderFile);
// 设置模板文件存放的目录，第一个参数不能变，第二个为目录  这里不能写绝对路径会出现问题
app.set('views', path.join(__dirname, '/views'));

// 注册时使用的模板引擎，第一个参数为view engin第二个参数和app.engine中定义的模板引擎的名称一致
app.set('view engine', 'html');
//swig.renderFile默认是会缓存到内存，当向客户端提供数据会从缓存中去
//线上提高性能，开发开发时，模板文件改变之后，刷新会从缓存中去来，内容和上次不变
//所以要关掉
swig.setDefaults({
    cache: false,
    autoescape: true,
    encoding: 'utf8',
});

// 设置bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// 引入user的数据模型
let User = require('./models/User');
// 设置cookies
app.use((req, res, next) => {
    req.cookies = new Cookies(req, res);
    // 解析登录用户的cookies信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            // 获取当前登录用户的角色
            User.findById(req.userInfo._id).then(doc=>{
                req.userInfo.role = doc.role;
                next();
            })
        }
        catch (e) {
            throw error(e);
            next();
        }
    } else {
        next();
    }
});

// 设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));
// 后台模块
app.use('/admin', require('./routers/admin.js'));
// api模块
app.use('/api', require('./routers/api.js'));
// 前台模块
app.use('/', require('./routers/main.js'));

// 加载数据库模块
// 连接数据库
mongoose.connect('mongodb://47.52.63.21:27017/blog', {
        useMongoClient: true
    }, err => {
        if (err) {
            console.log('数据库连接失败！');
        } else {
            console.log('数据库连接成功！');
            // 监听http请求
            app.listen(port, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('服务器启动');
            });
        }
    }
);
