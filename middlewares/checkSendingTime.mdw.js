const model = require('../models/model');
module.exports = async(req, res, next) => {
    const timestamp = req.headers.timestamp;
    const ts = Date.now();
    const denta = ts- timestamp;
    if(denta < 0 || denta > 600000){ // over 10m
        return res.status(401).json({"message": "Failed", "error":"Exceeded time allowed."});
    }
    next();
}