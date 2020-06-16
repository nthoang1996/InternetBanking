const express = require('express');
const model = require('../../models/model')
const config = require('../../config/config.json');
const NodeRSA = require('node-rsa');
const moment = require('moment');
const key = new NodeRSA(config.secret_key.public_key.join('\n'));
key.setOptions({ encryptionScheme: 'pkcs1' });
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
const router = express.Router();
router.route('/recharge')
    .post(async function (req, res) {
        const data = req.body.data;
        const dataVerify = {};
        dataVerify.ts = parseInt(req.headers.timestamp);
        dataVerify.source_username = data.source_username;
        dataVerify.value = data.value;
        console.log("data", data);
        const verify = key.verify(dataVerify, data.signature, '', 'base64');
        if (verify === true) {
            const customer = await model.single_by_username_id('tbluser', data.des_username);
            if (customer.length == 0) {
                return res.status(500).json({ message: "", error: "UsernameID not found" });
            }
            const cus_value = parseInt(customer[0].bank_balance) + parseInt(data.value);
            const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { username: data.des_username });
            const entity = {
                type: 2,
                root_id: customer[0].id,
                source_username: data.source_username,
                source_name: data.source_name,
                bank_company_id: data.bank_company_id,
                des_username: customer[0].username,
                des_name: customer[0].name,
                value: data.value,
                message: data.message,
                time: new Date()
            }
            const insert_his = await model.add('tblhistorytransaction', entity);
            const result = { message: "Success", error: "", username: customer[0].name};
            const signature=key.sign(dataVerify, 'base64');
            console.log(signature);
            return res.status(200).json({data:result, signature});

        } else {
            return res.status(400).json({ message: "Failed", error: "Validate failed" });
        }

    })

router.route('/query_information')
    .post(async function (req, res) {
        const usernameID = req.body.data.usernameID;
        console.log("username", usernameID);
        const customer = await model.single_by_username_id('tbluser', usernameID);
        if (customer.length == 0) {
            return res.status(400).json({ message: "Success", error: "" });
        }
        const result = {
            name: customer[0].name,
            username: customer[0].username,
        };
        console.log("my-result", result);
        return res.status(200).json({ message: "Success", error: "", data: result });

    })

module.exports = router;