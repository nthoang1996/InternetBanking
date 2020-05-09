const express = require('express');
const model = require('../../models/model')

const router = express.Router();
router.route('/recharge')
    .post(async function(req, res) {
        const source_id = req.body.source_id;
        const des_id = req.body.des_id;
        const value = req.body.value;
        const customer = await model.single_by_id('tbluser', des_id);
        const cus_value = parseInt(customer[0].bank_balance) + parseInt(value);
        const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { id: des_id });
        const entity = {
            type: 1,
            source_id,
            bank_company_id: 100,
            des_id,
            value,
            message: ''
        }
        const insert_his = await model.add('tblhistorytransaction', entity);
        res.status(200).json({ message: "Success" });
    })

module.exports = router;