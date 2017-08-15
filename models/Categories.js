/**
 * Created by csq on 2017/8/15.
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const categoriesSchema = require('../schemas/categories');
module.exports = mongoose.model('Categories',categoriesSchema);