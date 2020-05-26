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

router.route('/verification/')
    .get(async function(req,res){
        const sender = await model.single_by_id('tbluser', req.query.id);
        if(sender[0].verify.code == req.query.verify){
            const ts = Date.now();
            if(ts - sender[0].verify.ts <= 180){
                res.send('Ok con de');
            }
            else{
                res.status(498).json({ message: "Failed", error: "Verify expired"});
            }
        }
        else{
            res.status(401).json({ message: "Failed", error: "Authentication failed"});
        }
    })

module.exports = router;
