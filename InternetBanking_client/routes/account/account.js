const express = require('express');
const model = require('../../models/model')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "6LeQAMwUAAAAANC665bQZKP5KE-JUtd6UQdXcG-D";
const request = require('request');

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

router.route('/verify').post(function(req, res) {
    if (!req.body.captcha) {
        console.log("err");
        return res.json({ "success": false, "msg": "Capctha is not checked" });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

    request(verifyUrl, (err, response, body) => {

        if (err) { console.log(err); }

        body = JSON.parse(body);

        if (!body.success && body.success === undefined) {
            return res.json({ "success": false, "msg": "captcha verification failed" });
        } else if (body.score < 0.5) {
            return res.json({ "success": false, "msg": "you might be a bot, sorry!", "score": body.score });
        }

        // return json message or continue with your function. Example: loading new page, ect
        return res.json({ "success": true, "msg": "captcha verification passed", "score": body.score });

    })
})
module.exports = router;
