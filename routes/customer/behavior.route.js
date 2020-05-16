const express = require('express');
const model = require('../../models/model')
const config = require('../../config/config.json');
const NodeRSA = require('node-rsa');
const key = new NodeRSA(config.secret_key.private_key.join('\n'));
key.setOptions({ encryptionScheme: 'pkcs1' });
const router = express.Router();

router.route('/recharge')
    .post(async function(req, res) {
        const decrypted = key.decrypt(req.body.data, 'utf8');
        console.log(decrypted);
        const data = JSON.parse(decrypted);
        console.log(typeof(data));
        const source_id = data.source_id;
        const des_id = data.des_id;
        const value = data.value;
        console.log(source_id, des_id, value);
        const customer = await model.single_by_id('tbluser', des_id);
        const cus_value = parseInt(customer[0].bank_balance) + parseInt(value);
        const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { id: des_id });
        const entity = {
            type: 1,
            source_id,
            bank_company_id: req.headers.company_id,
            des_id,
            value,
            message: ''
        }
        const insert_his = await model.add('tblhistorytransaction', entity);
        res.status(200).json({ message: "Success" });
    })

    router.route('/query_information')
    .post(async function(req,res){
        const des_id = req.body.des_id;
        const customer = await model.single_by_id('tbluser', des_id);
        //console.log(customer);
        const result = {
            name: customer[0].name,
            phone: customer[0].phone,
            address: customer[0].address,
            email: customer[0].email,
            username: customer[0].username,
            password: customer[0].password,
            bank_balance: customer[0].balance,
            is_active: customer[0].is_active
        };
        res.status(200).json(result);
    })

module.exports = router;