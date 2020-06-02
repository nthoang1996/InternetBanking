const express = require('express');
const model = require('../../models/model')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/login').post(async function(req,res){
    const rows = await model.single_by_username('tbluser', req.body.username);
    if(rows.length == 0){
        return res.status(404).json({"message":"Failed", "error": "Username not found"});
    }
    const hashPwd = rows.password;
    const rs = bcrypt.compareSync(req.body.password, hashPwd);
    if (rs === false) {
        return res.status(401).json({"message":"Failed", "error": "Authenticate failed"});
    }
    const payload = {
        userID: rows.id,
    };
    const token = jwt.sign(payload, 'secretKey', {
        expiresIn: 10 * 60 ,
    })
    res.status(200).json({"message":"Success", "error": "", "access_token": token});

})

module.exports = router;
