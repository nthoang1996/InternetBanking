const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const config = require('../config/config.json');
const model = require('../models/model');

module.exports = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log("token", token);
    if(token){
        jwt.verify(token, config.JWT.secret_key,function(err, payload){
            if(err){
                throw createError(403, err);
            }
            req.tokenPayload = payload;
            const user = await model.single_by_id('tbluser', req.tokenPayload.userID);
            if(user[0].role !==3){
                throw createError(401, "Bạn không có quyền gọi tới tài nguyên này!")
            }
            next();
        })
    }else{
        throw createError(401, 'Không tìm thấy token!');
    }
}