/**
 * Created by csq on 2017/8/16.
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const contentSchema = require('../schemas/content');
module.exports = mongoose.model('Content',contentSchema);