/**
 * Created by csq on 2017/8/11.
 */

//加载express模块
const express = require('express');
// 创建app应用
const app = express();
const port = 8080;




// 监听http请求
app.listen(port,(err)=>{
  if(err){
    console.log(err);
  }
  console.log('服务器启动');
});