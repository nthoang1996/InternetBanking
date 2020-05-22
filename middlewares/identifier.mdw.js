const model = require('../models/model');
module.exports = async(req, res, next) => {
    // kiểm tra xem có phải ngân hàng đã đăng ký không?
    const bank_id = req.headers.company_id;
    const bank = await model.compare_with_bankId('tblbank', bank_id);
    console.log(bank);
    if(bank === null){
        res.json({error:"Not found bank."});
    }    
    next();
}