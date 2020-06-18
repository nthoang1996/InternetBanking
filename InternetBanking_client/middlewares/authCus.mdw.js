const createError = require('http-errors');
const config = require('../config/config.json');
const model = require('../models/model');

module.exports = async(req, res, next) => {
    const user = await model.single_by_id('tbluser', req.tokenPayload.userID);
    if (user[0].role !== 3) {
        throw createError(401, "Bạn không có quyền gọi tới tài nguyên này!")
    }
    next();
}