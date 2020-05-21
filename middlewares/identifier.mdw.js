const model = require('../models/model');
module.exports = async(req, res, next) => {
    // kiểm tra xem có phải ngân hàng đã đăng ký không?
    var token = req.headers['x-secret-string'];
    var bank_id = parseInt(req.headers.company_id);
    const bank = await model.single_by_id('tblbank', bank_id);
    console.log(bank);
    if(bank.length === null || bank[0].secret_string !== token){
        res.json({error:"Not found bank."});
    }    
    next();
}