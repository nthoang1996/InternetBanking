const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token,'secretKey',function(err, payload){
            if(err){
                throw createError(403, err);
            }
            req.tokenPaylaod = payload;
            next();
        })
    }else{
        throw createError(401, 'No accessToken found');
    }
}