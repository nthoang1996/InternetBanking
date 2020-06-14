const express = require('express');
const model = require('../../models/model');
const router = express.Router();
const hoangbankapi = require('../../models/hoangbankapi');
const datbankapi = require('../../models/datbankapi');
const nodemailer = require('nodemailer');
const createError = require('http-errors');
const numeral = require('numeral');
// const transporter = require('../../utils/email')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hoangbankptudwnc@gmail.com',
        pass: '12345678x@X'
    }
});

router.route('/transferAboard')
    .post(async function (req, res) {
        const data = req.body;
        const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
        const sder_value = parseInt(sender[0].bank_balance) - parseInt(data.value);
        const update_sder = await model.edit('tbluser', { bank_balance: sder_value }, { id: req.tokenPayload.userID });
        const formData = JSON.stringify({ data: data });
        api = new hoangbankapi(data);
        const response = await api.callApiRecharge();
        if (response.error) {
            res.status(401).json(response);
        } else {
            res.status(200).json(response);
        }
    })

router.route('/transferInternal')
    .post(async function (req, res) {
        console.log(req.tokenPayload);
        const data = req.body;
        const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
        const sder_value = parseInt(sender[0].bank_balance) - parseInt(data.value);
        const update_sder = await model.edit('tbluser', { bank_balance: sder_value }, { id: req.tokenPayload.userID });
        const customer = await model.single_by_id('tbluser', data.des_id);
        if (customer.length == 0) {
            return res.status(500).json({ message: "", error: "ID not found" });
        }
        const cus_value = parseInt(customer[0].bank_balance) + parseInt(data.value);
        const update_cus = await model.edit('tbluser', { bank_balance: cus_value }, { id: data.des_id });
        const entity = {
            type: 1,
            source_id: req.tokenPayload.userID,
            bank_company_id: -1,
            des_id: data.des_id,
            value: data.value,
            message: data.message
        }
        const insert_his = await model.add('tblhistorytransaction', entity);
        return res.status(200).json({ message: "Success", error: "" });
    })

router.route('/confirmination_Email')
    .post(async function (req, res) {
        try {
            const data = req.body;
            const verify = Math.floor((Math.random() * 10000000) + 1);
            const ts = Date.now();
            const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
            let userdata = {
                id: req.tokenPayload.userID,
                verify: "TRUE"
            }
            res.cookie("UserInfo", userdata);
            const entityID = { "id": req.tokenPayload.userID };
            const entity = { "verify": JSON.stringify({ code: verify, ts: ts }) }
            const update = model.edit('tbluser', entity, entityID);
            const mailOption = {
                from: 'thecoderank@gmail.com', // sender this is your email here
                to: `${sender[0].email}`, // receiver email2
                subject: "Account Verification",
                html: `<h1>Hello Friend Please Click on this link<h1><br><hr><p>HELLO I AM 
            HOANGBANKPTUDWNC.</p> <br>
            <p>Seem you have requested for transfer money to the account ${data.des_id}</p><br>
            <p>Your code is ${verify} </p><br>
            <p>Please use this code to confirm your action in my website</p>
            <p>Thanks and best regard</p>`
            }
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    console.log(error)
                } else {

                    let userdata = {
                        email: `${req.body.Email}`,
                    }
                    res.cookie("UserInfo", userdata);
                    res.send("Your Mail Send Successfully")
                }
            })
        } catch (e) {
            createError('500', e)
        }

    })

router.route('/verification/')
    .get(async function (req, res) {
        const sender = await model.single_by_id('tbluser', req.tokenPayload.userID);
        if (sender[0].verify.code == req.body.verify) {
            const ts = Date.now();
            if (ts - sender[0].verify.ts <= 180) {
                res.status(200).json({ message: "Success", error: "" });
            } else {
                res.status(498).json({ message: "Failed", error: "Verify expired" });
            }
        } else {
            res.status(401).json({ message: "Failed", error: "Authentication failed" });
        }
    })

router.route('/user_contact')
    .post(async function (req, res) {
        let response = "";
        let data = {};
        switch (req.body.bank_company_id) {
            case '':
                const user = await model.single_by_id('tbluser', req.body.des_id);
                if (user.length == 0) {
                    return res.status(400).json({ message: "Failed", error: "User id not found" });
                }
                break;
            case 'TttwVLKHvXRujyllDq':
                api = new hoangbankapi({ data: req.body });
                response = await api.callApiGetInfo();
                data = JSON.parse(response);
                if (!data.data) {
                    return res.status(400).json({ message: "Failed", error: "User id not found" });
                }
                break;
            case 'pawGDX1Ddu':
                api = new datbankapi({ stk: req.body.des_id });
                response = await api.callApiGetInfo();
                console.log(response)
                data = JSON.parse(response);
                if (!data.data) {
                    return res.status(400).json({ message: "Failed", error: "User id not found" });
                }
                break;

        }
        const tblContact = await model.all_by_source_id('tblreceivercontact', req.tokenPayload.userID);
        const obj = tblContact.find(o => o.des_id == req.body.des_id && o.bank_company_id == req.body.bank_company_id);
        if (obj) {
            return res.status(409).json({ message: "Failed", error: "Duplicated entry" });
        }
        const entity = {
            source_id: req.tokenPayload.userID,
            ...req.body,
        }
        if (entity.name_contact === '') {
            entity.name_contact = data.name;
        }
        const add = model.add('tblreceivercontact', entity)
        return res.status(200).json({ message: "Success", error: "" });
    })
    .get(async function (req, res) {
        const rows = await model.all_by_source_id('tblreceivercontact', req.tokenPayload.userID);
        const listBank = await model.all('tblbank');
        rows.forEach(element => {
            if (element.bank_company_id === 'TttwVLKHvXRujyllDq') {
                element.bank_name = "Cùng ngân hàng";
            }
            else {
                const bank = listBank.find(bank => bank.id === element.bank_company_id);
                if (bank) {
                    element.bank_name = bank.name;
                }
            }
        });
        console.log(rows);
        return res.status(200).json({ message: "Success", error: "", data: rows });
    })

router.route('/user_contact/:contact_id')
    .put(async function (req, res) {
        const edit = await model.edit('tblreceivercontact', req.body, { id: req.params.contact_id });
        return res.status(200).json({ message: "Success", error: "" });
    })
    .delete(async function (req, res) {
        const del = await model.del('tblreceivercontact', { id: req.params.contact_id })
        return res.status(200).json({ message: "Success", error: "" });
    })

router.route('/saving_account')
    .get(async function (req, res) {
        const rows = await model.all_by_id_user('tblsavingaccount', req.tokenPayload.userID);
        for (let i = 0; i < rows.length; i++) {
            rows[i].bank_balance = numeral(rows[i].bank_balance).format('0,0') + " ₫";
        }
        return res.status(200).json({ message: "Success", error: "", data: rows });
    })
module.exports = router;