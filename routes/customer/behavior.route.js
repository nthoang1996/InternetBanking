const express = require('express');
const model = require('../../models/model')
const config = require('../../config/config.json');
const NodeRSA = require('node-rsa');
const key = new NodeRSA(config.secret_key.public_key.join('\n'));
key.setOptions({ encryptionScheme: 'pkcs1' });
const router = express.Router();
router.route('/recharge')
    .post(async function(req, res) {
        console.log(typeof(req.body.data));
        const data = req.body.data;
        const dataVerify = {};
        dataVerify.ts = data.ts;
        dataVerify.source_id = data.source_id;
        dataVerify.value = data.value;
        const verify = key.verify(dataVerify, data.signature,'', 'base64');
        if(verify === true){
            res.status(200).json({ message: "Success", error: ""});
        }else{
            res.status(200).json({ message: "Success", error: "Validate failed"});
        }
        
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