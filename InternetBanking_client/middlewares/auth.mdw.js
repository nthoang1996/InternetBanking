const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log("token", token);
    if(token){
        jwt.verify(token, config.JWT.secret_key,function(err, payload){
            if(err){
                throw createError(403, err);
            }
            req.tokenPayload = payload;
            next();
        })
    }else{
        throw createError(401, 'Không tìm thấy token!');
    }
}