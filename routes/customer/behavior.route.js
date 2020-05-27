const express = require('express');
const model = require('../../models/model')
const config = require('../../config/config.json');
const NodeRSA = require('node-rsa');
const key = new NodeRSA(config.secret_key.public_key.join('\n'));
key.setOptions({ encryptionScheme: 'pkcs1' });
const router = express.Router();
router.route('/recharge')
    .post(async function(req, res) {
        const data = req.body.data;
        const dataVerify = {};
        dataVerify.ts = data.ts;
        dataVerify.source_id = data.source_id;
        dataVerify.value = data.value;
        const verify = key.verify(dataVerify, data.signature,'', 'base64');
        if(verify === true){
            const customer = await model.single_by_id('tbluser', data.des_id);
            if(customer.length == 0){
                return res.status(500).json({ message: "", error: "ID not found"});
            }
            const cus_value = parseInt(customer[0].bank_balance) + parseInt(data.value);
            const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { id: data.des_id });
            const entity = {
                type: 1,
                source_id:data.source_id,
                bank_company_id: req.headers.company_id,
                des_id:data.des_id,
                value:data.value,
                message: data.message
            }
            const insert_his = await model.add('tblhistorytransaction', entity);
            return res.status(200).json({ message: "Success", error: ""});
            
        }else{
            return res.status(400).json({ message: "Failed", error: "Validate failed"});
        }
        
    })

    router.route('/query_information')
    .post(async function(req,res){
        const des_id = req.body.data.des_id;
        const customer = await model.single_by_id('tbluser', des_id);
        if(customer.length == 0){
            return res.status(400).json({ message: "Success", error: ""});
        }
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
        return res.status(200).json({ message: "Success", error: "", data: result});
    })

module.exports = router;