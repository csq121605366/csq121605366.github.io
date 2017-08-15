/**
 * Created by csq on 2017/8/15.
 */

const mongoose = require('mongoose');

/**
 * 文章分类的表结构
 */

module.exports = new mongoose.Schema({
  //分类名称
  name: String
});

