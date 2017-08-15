/**
 * Created by csq on 2017/8/15.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const userSchema = require('../schemas/users');
module.exports = mongoose.model('User', userSchema);