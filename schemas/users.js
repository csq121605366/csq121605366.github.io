// 引入mongoose数据库schemas
const mongoose = require('mongoose');

// 用户的表结构
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    // 密码
    password: String,
    // 角色信息
    role: String
});