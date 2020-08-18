const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const numeral = require("numeral");
const bcrypt = require("bcrypt");
const moment = require('moment');

router.route("/create_employee_account").post(async function(req, res){
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;
    var username = req.body.username;
    var passwordHash = req.body.password;

    var password = bcrypt.hashSync(passwordHash, 10);
    //console.log("Password hash:" + password);
    const entity = {
      name,
      phone,
      address,
      email,
      username,
      password,
      role: 2,
      bank_balance: 0,
      verify: '',
      is_active: 1
    }
    
    const rows = await model.all_by_role('tbluser', 2);
    //console.log(rows);
    
    for (var i = 0; i < rows.length; i++ ){
        if (rows[i].username === username){
            return res.status(200).json({ success: false, error: "Tên username bị trùng" });
        }
    }
    model.add('tbluser', entity);
    return res.status(200).json({ success: true, error: "" });
});

router.route("/list_account_employee").get(async function(req, res){
    const rows = await model.all_by_role("tbluser", 2);
    console.log("List employee: ", rows[0]);
    
    if ( rows.length > 0 ){
        return res.status(200).json({success: true, error: "", data: rows});
    }
    return res.status(401).json({ success: false, error: "Not found user" });
});

router.route("/delete_employee_account").delete(async function(req, res){
    //console.log("Data", req.body.id);
    const rows = await model.del('tbluser', {id: +req.body.id});
    return res.status(200).json({success: true, error: "", data: rows});
});

router.route("/account_employee/:id").get(async function(req, res){
    const id = req.params.id;
    const rows = await model.single_by_id('tbluser', id);
    if (rows.length === 1){
        console.log(rows);
        return res.status(200).json({success: true, error: "", data: rows});
    }else{
        return res.status(401).json({ success: false, error: "Not found user" });
    }
});

router.route("/edit_employee_account").post(async function(req, res){
    //console.log("Data", req.body.id);
    console.log(req.body);
    const newId = {id: req.body.id};
    const entity = {
        name: req.body.form.name,
        email: req.body.form.email,
        address: req.body.form.address,
        phone: req.body.form.phone,
    }
    model.update_account_employee('tbluser', entity, newId);
    return res.status(200).json({ success: true, error: "" });
});

router.route("/total_transfer/:bank/:time").get(async function(req, res){
    const bank = req.params.bank;
    const time = req.params.time;
    //console.log(bank, time);

    const rows = await model.all_by_bank_other('tblhistorytransaction', 'TttwVLKHvXRujyllDq');
    //console.log(rows);

    rows.sort((a, b)=>{return b.time - a.time});

    var listTransaction = [];
    var valueTransaction = [];

    rows.forEach(element => {
    
        if (bank === 'a' && element.bank_company_id === "TnyjhGBTwMthNgYZkq"){
            listTransaction.push(element);
        }
        else if (bank === 'b' && element.bank_company_id === "jpS38Zwq37hIQf0jkO"){
            listTransaction.push(element);
        }
        else if (bank === 'c' && element.bank_company_id === "hFKsgwJyJXUpNxNwZM"){
            listTransaction.push(element);
        }
        else if (bank === 'd' && element.bank_company_id === "pawGDX1Ddu"){
            listTransaction.push(element);
        }
        else if (bank === 'all'){
            listTransaction.push(element);
        }
        else{
        }
    });

    var resultListTransaction = [];
    const presentTime = Date.now();
    listTransaction.forEach(element => {
        const timeTransaction = new Date(element.time).getTime();
        
        const typeTime = presentTime - timeTransaction;
        //console.log(element);
        //console.log("time", time);
        if (time === '0'){
            console.log("nhảy");
            resultListTransaction.push(element);
        }else if (time === '1' & typeTime <= 86400000){
            resultListTransaction.push(element);
        }else if (time === '2' & typeTime <= 604800000){
            resultListTransaction.push(element);
        }else if (time === '3' & typeTime <= 2629800000){
            resultListTransaction.push(element);
        }
        else if (time === '4' & typeTime <= 31557600000){
            resultListTransaction.push(element);
        }
    });

    console.log("result List Transaction", resultListTransaction);


    var valueA = 0;
    var valueAChuyen = 0;
    var valueANhan = 0;

    var valueB = 0;
    var valueBChuyen = 0;
    var valueBNhan = 0;

    var valueC = 0;
    var valueCChuyen = 0;
    var valueCNhan = 0;

    var valueDat = 0;
    var valueDatChuyen = 0;
    var valueDatNhan = 0;


    resultListTransaction.forEach(element => {
        const value = +element.value;
        if (element.bank_company_id === 'TnyjhGBTwMthNgYZkq'){
            valueA += value;
            if(element.type === 1){
                valueAChuyen += value;
            }
        }else if (element.bank_company_id === 'jpS38Zwq37hIQf0jkO'){
            valueB += value;
            if(element.type === 1){
                valueBChuyen += value;
            }
        }else if (element.bank_company_id === 'hFKsgwJyJXUpNxNwZM'){
            valueC += value;
            if(element.type === 1){
                valueCChuyen += value;
            }
        }else if (element.bank_company_id === 'pawGDX1Ddu'){
            valueDat += value;
            if(element.type === 1){
                valueDatChuyen += value;
            }
        }
    });

    valueANhan = valueA - valueAChuyen;
    valueBNhan = valueB - valueBChuyen;
    valueCNhan = valueC - valueCChuyen;
    valueDatNhan = valueDat - valueDatChuyen;

    const bankA = {
        id: 1,
        name: "NGÂN HÀNG A",
        value: numeral(valueA).format("0,0") + " VNĐ",
        valueChuyen: numeral(valueAChuyen).format("0,0") + " VNĐ",
        valueNhan: numeral(valueANhan).format("0,0") + " VNĐ"
    }

    const bankB = {
        id: 2,
        name: "NGÂN HÀNG B",
        value: numeral(valueB).format("0,0") + " VNĐ",
        valueChuyen: numeral(valueBChuyen).format("0,0") + " VNĐ",
        valueNhan: numeral(valueBNhan).format("0,0") + " VNĐ"
    }

    const bankC = {
        id: 3,
        name: "NGÂN HÀNG C",
        value: numeral(valueC).format("0,0") + " VNĐ",
        valueChuyen: numeral(valueCChuyen).format("0,0") + " VNĐ",
        valueNhan: numeral(valueCNhan).format("0,0") + " VNĐ"
    }

    const bankDat = {
        id: 4,
        name: "NGÂN HÀNG CỦA ĐẠT",
        value: numeral(valueDat).format("0,0") + " VNĐ",
        valueChuyen: numeral(valueDatChuyen).format("0,0") + " VNĐ",
        valueNhan: numeral(valueDatNhan).format("0,0") + " VNĐ"
    }

    if ( bank ===  'a') {
        valueTransaction.push(bankA);
    } else if ( bank ===  'd') {
        valueTransaction.push(bankDat);
    } else if ( bank ===  'b') {
        valueTransaction.push(bankB);
    } else if ( bank ===  'c') {
        valueTransaction.push(bankC);
    }else if ( bank ===  'all') {
        valueTransaction.push(bankA);
        valueTransaction.push(bankB);
        valueTransaction.push(bankC);
        valueTransaction.push(bankDat);
    }

    for (let i = 0; i < resultListTransaction.length; i++) {
        resultListTransaction[i].value = numeral(resultListTransaction[i].value).format("0,0") + " VNĐ";
        resultListTransaction[i].time = moment(resultListTransaction[i].time).format(
            "MMMM Do YYYY"
        );        
    }

    const result = {
        resultListTransaction,
        count: resultListTransaction.length,
        valueTransaction
    }

    return res.status(200).json({success: true, error: "", data: result});

});


module.exports = router;
