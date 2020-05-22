const express = require('express');
const model = require('../../models/model')
const config = require('../../config/config.json');
const NodeRSA = require('node-rsa');
const router = express.Router();
const request = require('request');
const key = new NodeRSA(null, {signingScheme: 'pkcs1-sha256'});
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
const hoangbankapi = require('../../models/hoangbankapi');
router.route('/recharge')
    .post(async function(req, res) {
        const data = req.body;
        const formData = JSON.stringify({data:data});
        const ts = Date.now();
        data.ts = ts;
        api = new hoangbankapi(data);
        const response = await api.callApi();
        if(response.error){
            res.status(401).json(response);
        }else{
            res.status(200).json(response);
        }

        // const dataVerify = {};
        // dataVerify.ts = ts;
        // dataVerify.source_id = data.source_id;
        // dataVerify.value = data.value;
        // signature=key.sign(dataVerify, 'base64');
        // data.signature = signature;
        
        // let response = {};
        // request({
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'company_id': 'TttwVLKHvXRujyllDq',
        //     },
        //     uri: 'http://localhost:8000/customer/recharge',
        //     body: formData,
        //     method: 'POST'
        //   }, function (err, response, body) {
        //       console.log(response.body);
        //     if(response.body.error){
        //         res.status(401).json(response.body);
        //     }else{
        //         res.status(200).json(response.body);
        //     }
        // });
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