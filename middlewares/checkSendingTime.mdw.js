const model = require('../models/model');
module.exports = async(req, res, next) => {
    const timestamp = req.headers.timestamp;
    const ts = Date.now();
    console.log(ts);
    const denta = ts- timestamp;
    if(denta > 0 || denta > 10){ // over 10s
        return res.json({error:"Exceeded time allowed."});
    }
    
    next();
}