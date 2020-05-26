const express = require('express');
const model = require('../../models/model')
const router = express.Router();
const hoangbankapi = require('../../models/hoangbankapi');
const nodemailer = require('nodemailer');
const createError = require('http-errors');
// const transporter = require('../../utils/email')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'hoangbankptudwnc@gmail.com',
        pass:'12345678x@X'
    }
});

router.route('/transferAboard')
    .post(async function(req, res) {
        const data = req.body;
        const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
        const sder_value = parseInt(sender[0].bank_balance) - parseInt(data.value);
        const update_sder = await model.edit('tbluser', { bank_balance: sder_value }, { id:req.tokenPayload.userID });
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

    router.route('/transferInternal')
    .post(async function(req,res){
        console.log(req.tokenPayload);
        const data = req.body;
        const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
        const sder_value = parseInt(sender[0].bank_balance) - parseInt(data.value);
        const update_sder = await model.edit('tbluser', { bank_balance: sder_value }, { id:req.tokenPayload.userID });
        const customer = await model.single_by_id('tbluser', data.des_id );
        if(customer.length == 0){
            return res.status(500).json({ message: "", error: "ID not found"});
        }
        const cus_value = parseInt(customer[0].bank_balance) + parseInt(data.value);
        const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { id: data.des_id });
        const entity = {
            type: 1,
            source_id:req.tokenPayload.userID,
            bank_company_id: -1,
            des_id:data.des_id,
            value:data.value,
            message: data.message
        }
        const insert_his = await model.add('tblhistorytransaction', entity);
        res.status(200).json({ message: "Success", error: ""});
    })

    router.route('/confirmination_Email')
    .post(async function(req,res){
        try{
            const data = req.body;
            const verify = Math.floor((Math.random() * 10000000) + 1);
            const ts = Date.now();
            const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
            let userdata = {
                id : req.tokenPayload.userID,
                verify: "TRUE"
            }
            res.cookie("UserInfo",userdata);
            const entityID = {"id":req.tokenPayload.userID};
            const entity = {"verify": JSON.stringify({code: verify, ts: ts})}
            const update = model.edit('tbluser', entity, entityID);
            const mailOption = {
                from :'thecoderank@gmail.com', // sender this is your email here
                to : `${sender[0].email}`, // receiver email2
                subject: "Account Verification",
                html: `<h1>Hello Friend Please Click on this link<h1><br><hr><p>HELLO I AM 
            HOANGBANKPTUDWNC.</p> <br>
            <p>Seem you have requested for transfer money to the account ${data.des_id}</p><br>
            <br><p> Please click the link below to confirmination your action: </p><br>\
            <a href="http://localhost:3000/account/verification/?verify=${verify}&id=${req.tokenPayload.userID}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
            }
            transporter.sendMail(mailOption,(error,info)=>{
                if(error){
                    console.log(error)
                }else{

                    let userdata = {
                        email : `${req.body.Email}`,
                    }
                    res.cookie("UserInfo",userdata);
                    res.send("Your Mail Send Successfully")
                }
            })
        }
        catch(e){
            createError('500', e)
        }
        
    })

module.exports = router;