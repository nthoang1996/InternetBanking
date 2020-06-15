const md5 = require('md5');
const model = require('../models/model');

module.exports = async (req,res, next) =>{
    const signature = req.headers['x-signature'];
    const time = req.headers['timestamp'];
    const data = JSON.stringify(req.body);

    const idCompany = req.headers.company_id; // id company
    const result = await model.single_by_idString('tblbank', idCompany);
    const secret_key = result[0].secret_key // get secret_key bank
    const hash = md5(time + data + secret_key); // hash

    if (hash !== signature ){
        return res.status(401).json({"message": "Failed", "error": "Invalid"});
    }
    next();
}