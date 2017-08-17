/**
 * Created by csq on 2017/8/16.
 */


const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  // 内容标题
  title: String,
  // 关联字段-分类id
  category: {
    //类型
    type: mongoose.Schema.Types.ObjectId,
    // 这里填写引用
    ref: 'Categories'
  },
  // 用户id
  user: {
    //类型
    type: mongoose.Schema.Types.ObjectId,
    // 这里填写引用
    ref: 'User'
  },
  // 创建时间
  created_time: {
    type: Date,
    default: new Date()
  },
  // 点击量
  views: {
    type: Number,
    default: 0
  },
  
  // 描述
  description: {
    type: String,
    default: ''
  },
  // 内容
  content: {
    type: String,
    default: ''
  },
  // 评论
  comments:{
    type:Array,
    default:[]
  }
});
