const express = require('express');
const model = require('../../models/model')
const config = require('../../config/config.json');
const NodeRSA = require('node-rsa');
const moment = require('moment');
const openpgp = require('openpgp');
const key = new NodeRSA(config.secret_key.public_key.join('\n'));
key.setOptions({ encryptionScheme: 'pkcs1' });
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
const sleep = require('sleep');
const router = express.Router();
router.route('/recharge')
    .post(async function (req, res) {
        try {
            const data = req.body.data;
            let verify = false;
            switch (req.headers.company_id) {
                case 'TttwVLKHvXRujyllDq':
                    const dataVerify = {};
                    dataVerify.ts = parseInt(req.headers.timestamp);
                    dataVerify.source_username = data.source_username;
                    dataVerify.value = data.value;
                    verify = key.verify(dataVerify, data.signature, '', 'base64');
                    if (verify === true) {
                        const customer = await model.single_by_username_id('tbluser', data.des_username);
                        if (customer.length == 0) {
                            let result = { success: false, error: "Tài khoản nạp không tồn tại" };
                            let signature = key.sign(result, 'base64');
                            return res.status(500).json({ data: result, signature });
                        }
                        const income = parseInt(data.value);
                        if (data.type == 1) {
                            income -= config.config.fee;
                        }
                        const cus_value = parseInt(customer[0].bank_balance) + income;
                        const update_cus = await model.edit('tbluser', { bank_balance: income }, { username: data.des_username });
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
                        let result = { success: true, error: "", username: customer[0].name };
                        let signature = key.sign(result, 'base64');
                        console.log(signature);
                        return res.status(200).json({ data: result, signature });
                    } else {
                        let result = { success: false, error: "Xác thực thất bại" };
                        let signature = key.sign(result, 'base64');
                        return res.status(400).json({ data: result, signature });
                    }
                    break;
                case 'pawGDX1Ddu':
                    const cleartext = req.body.cleartext;
                    const bank = await model.single_by_id('tblbank', 'pawGDX1Ddu');
                    sleep.sleep(2);
                    const verified = await openpgp.verify({
                        message: await openpgp.cleartext.readArmored(cleartext), // parse armored message
                        publicKeys: (await openpgp.key.readArmored(bank[0].public_key)).keys, // for verification
                    });

                    verify = verified.signatures[0].valid;
                    if (verify === true) {
                        let serial_data = cleartext.slice(cleartext.indexOf('{'), cleartext.lastIndexOf('}')+1);
                        serial_data = JSON.parse(serial_data).data;
                        console.log("data", serial_data);
                        const customer = await model.single_by_username_id('tbluser', serial_data.des_username);
                        if (customer.length == 0) {
                            let result = { success: false, error: "Tài khoản nạp không tồn tại" };
                            let signature = key.sign(result, 'hex');
                            return res.status(500).json({ serial_data: result, signature });
                        }
                        const cus_value = parseInt(customer[0].bank_balance) + parseInt(serial_data.value);
                        const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { username: serial_data.des_username });
                        const entity = {
                            type: 2,
                            root_id: customer[0].id,
                            type_payment: 1,
                            source_username: serial_data.source_username,
                            source_name: serial_data.source_name,
                            bank_company_id: serial_data.bank_company_id,
                            des_username: customer[0].username,
                            des_name: customer[0].name,
                            value: serial_data.value,
                            message: serial_data.message,
                            time: new Date()
                        }
                        // const insert_his = await model.add('tblhistorytransaction', entity);
                        let result = { success: true, error: "", username: customer[0].name };
                        let signature = key.sign(result, 'hex');
                        console.log("sig", signature);
                        return res.status(200).json({ data: result, signature });
                    } else {
                        let result = { success: false, error: "Xác thực thất bại" };
                        let signature = key.sign(result, 'hex');
                        return res.status(400).json({ data: result, signature });
                    }
                    break;
            }
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ success:false, error: err});
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