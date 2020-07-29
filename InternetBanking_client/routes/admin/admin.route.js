const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const bcrypt = require("bcrypt");

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

module.exports = router;
