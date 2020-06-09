const express = require('express');
const model = require('../../models/model')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const request = require('request');
const randToken = require('rand-token');
const moment = require('moment');

router.route('/login').post(async function (req, res) {
    const rows = await model.single_by_username('tbluser', req.body.username);
    if (!rows) {
        return res.status(401).json({ "message": "Failed", "error": "Không tìm thấy tài khoản người dùng!" });
    }
    const hashPwd = rows.password;
    const rs = bcrypt.compareSync(req.body.password, hashPwd);
    if (rs === false) {
        return res.status(401).json({ "message": "Failed", "error": "Mật khẩu bạn nhập vào không đúng!" });
    }
    const payload = {
        userID: rows.id,
    };
    const token = jwt.sign(payload, config.JWT.secret_key, {
        expiresIn: 10 * 60,
    })

    const refreshToken = createRefreshToken(rows.id);
    
    res.status(200).json({ "message": "Success", "error": "", "access_token": token, refreshToken: refreshToken });

})

async function createRefreshToken(id){
    const refreshToken = randToken.generate(config.JWT.refresh_token.size);
    const entityId = {id}
    const del = model.del('userrefreshtokenext',entityId);
    const entity = {
        id,
        refresh_token: refreshToken,
        rdt: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const add = await model.add('userrefreshtokenext', entity);
    console.log(add);
    return refreshToken;
}

router.route('/verify').post(function (req, res) {
    if (!req.body.captcha) {
        console.log("err");
        return res.json({ "success": false, "msg": "Chưa kiểm tra captcha!" });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${config.captcha.secret_key}&response=${req.body.captcha}`;

    request(verifyUrl, (err, response, body) => {

        if (err) { console.log(err); }

        body = JSON.parse(body);

        if (!body.success && body.success === undefined) {
            return res.json({ "success": false, "msg": "Kiểm tra captcha thất bại!" });
        } else if (body.score < 0.5) {
            return res.json({ "success": false, "msg": "Xin lỗi, Bạn là một con bot!", "score": body.score });
        }

        // return json message or continue with your function. Example: loading new page, ect
        return res.json({ "success": true, "msg": "captcha verification passed", "score": body.score });

    })
})
module.exports = router;
