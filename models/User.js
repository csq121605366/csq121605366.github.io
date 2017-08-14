const mongoose = require('mongoose');

const userSchema = require('../schemas/users');
mongoose.Promise = global.Promise;
module.exports = mongoose.model('User', userSchema);