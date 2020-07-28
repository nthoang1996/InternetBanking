const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const numeral = require("numeral");
const moment = require("moment");
const transporter = require("../../utils/email");
const bcrypt = require("bcrypt");

router.route("/list_account_customer").get(async function(req, res){
  const rows = await model.all_by_role("tbluser", 3);
  //console.log("List user" + rows);
  for (let i = 0; i < rows.length; i++) {
    rows[i].bank_balance = numeral(rows[i].bank_balance).format("0,0") + " VNĐ";
  }
  if ( rows.length > 0 ){
    return res.status(200).json({success: true, error: "", data: rows});
  }
  return res.status(401).json({ success: false, error: "Not found user" });
}); 

router.route("/account_customer/:id").get(async function(req, res){
  const id = +req.params.id;
  const rows = await model.single_by_id("tbluser", id);
  if ( rows.length > 0 ){
    rows[0].bank_balance = numeral(rows[0].bank_balance).format("0,0") + " VNĐ";
    return res.status(200).json({success: true, error: "", data: rows});
  }
  return res.status(401).json({ success: false, error: "Not found user" });
});


router.route("/list_history_account_customer/:id").get(async function(req, res){
  const id = +req.params.id;
  const rows = await model.all_by_root_id( "tblhistorytransaction", id);
  for (let i = 0; i < rows.length; i++) {
    rows[i].value = numeral(rows[i].value).format("0,0") + " VNĐ";
  }
  const listBank = await model.all("tblbank");
  rows.forEach((element) => {
    element.date_display = moment(element.time).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    if (element.type_payment == 1) {
      element.type_pay = "Nguời gửi trả tiền";
    } else {
      element.type_pay = "Nguời nhận trả tiền";
    }
    if (element.type == 1) {
      element.displayName = element.des_name;
      element.nameType = "Chuyển khoản";
      element.accountId = element.des_username;
      element.myClass = "my-type-send";
    } else if (element.type == 2) {
      element.displayName = element.source_name;
      element.nameType = "Nhận tiền";
      element.accountId = element.source_username;
      element.myClass = "my-type-receive";
    }
    if (element.bank_company_id === "TttwVLKHvXRujyllDq") {
      element.bank_name = "Cùng ngân hàng";
    } else {
      const bank = listBank.find((bank) => bank.id === element.bank_company_id);
      if (bank) {
        element.bank_name = bank.name;
      }
    }
  });
  if ( rows.length > 0 ){
    return res.status(200).json({success: true, error: "", data: rows});
  }
  const rowsTemp = [];
  return res.status(200).json({ success: true, error: "Không có lịch sử giao dịch", data: rowsTemp });
});

router.route("/recharge_coin").post(async function(req, res){
  const id = req.body.dataSend.id;
  const newid = {id};
  const money = +req.body.dataSend.money;
  const row = await model.single_by_id('tbluser', id);

  const moneyInstance = + row[0].bank_balance;
  const newMoney = money + moneyInstance;
  const entity = {bank_balance: newMoney};
  model.update_coin_customer('tbluser', entity, newid);
  return res.status(200).json({ success: true, error: "" });

});

router.route("/create_customer_account").post(function(req, res){
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;

    var usernamelong = Date.now();
    var usernameTemp = usernamelong + '';
    var username = usernameTemp.slice(0,10);
    var passwordHash = parseInt(Math.random()*(999999-100000) + 100000);
    var passwordTemp = passwordHash + '';
    var password = bcrypt.hashSync(passwordTemp, 10);
    //console.log("Password hash:" + password);
    const entity = {
      name,
      phone,
      address,
      email,
      username,
      password,
      role: 3,
      bank_balance: 0,
      verify: '',
      is_active: 1
    }
    const mailOption = {
      from: "tuandobolero@gmail.com", // sender this is your email here
      to: `${email}`, // receiver email2
      subject: "Tạo tài khoản thành công",
      html: `<h3>Xin chào ${name}</h3> <br>
                <p>Chúng tôi là công ty cổ phần USTechBank</p>
                <p>Bạn đã đăng ký tài khoản ngân hàng thành công</p> 
                <p>Username: ${username}</p>
                <p>Password: ${passwordTemp} </p>
                <p>Cám ơn đã sử dụng dịch vụ của chúng tôi!</p>`,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Không thể tạo tài khoản" });
      } else {
        model.add('tbluser', entity);
        res.status(200).json({ success: true, error: "" });
      }
    });
    //console.log(entity);
});

module.exports = router;
