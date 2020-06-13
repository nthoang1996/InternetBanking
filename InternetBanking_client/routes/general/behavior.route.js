const express = require('express');
const model = require('../../models/model');
const router = express.Router();
const createError = require('http-errors');

router.route('/get_user_login_info')
    .get(async function(req, res) {
        console.log("UserID", req.tokenPayload.userID);
        const user= await model.single_by_id('tbluser', req.tokenPayload.userID);
        const data = user[0];
        delete data.password;
        delete data.verify;
        delete data.is_active;
        if(!user){
            return res.status(400).json({message: "Failed", error:"Không tìm thấy người dùng"});
        }

        return res.status(200).json({message: "Success", error:"", user: user[0]});
    })
module.exports = router;