const md5 = require('md5');

module.exports = (req,res, next) =>{
    const signature = req.headers['x-signature'];
    const secretKey = req.headers['x-secretKey'];
    const time = req.headers['time'];
    const data = req.body.data;
    const hash = md5(time + data + secretKey);
    if (hash !== signature ){
        res.status(401).json({error: "Invalid"});
    }
    next();
}