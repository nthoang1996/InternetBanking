const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.json");
const request = require("request");
const randToken = require("rand-token");
const moment = require("moment");
const createError = require("http-errors");

router.route("/login").post(async function (req, res) {
  console.log(req.body.username);
  const rows = await model.single_by_username("tbluser", req.body.username);
  if (!rows) {
    return res
      .status(401)
      .json({
        message: "Failed",
        error: "Không tìm thấy tài khoản người dùng!",
      });
  }
  const hashPwd = rows.password;
  const rs = bcrypt.compareSync(req.body.password, hashPwd);
  if (rs === false) {
    return res
      .status(401)
      .json({ message: "Failed", error: "Mật khẩu bạn nhập vào không đúng!" });
  }

  const token = generateAccessToken(rows.id);
  console.log("token", token);
  const refreshToken = await createRefreshToken(rows.id);

  res
    .status(200)
    .json({
      message: "Success",
      error: "",
      access_token: token,
      refresh_token: refreshToken,
    });
});

async function createRefreshToken(id) {
  const refreshToken = randToken.generate(config.JWT.refresh_token.size);
  const entityId = { id };
  const del = model.del("userrefreshtokenext", entityId);
  const entity = {
    id,
    refresh_token: refreshToken,
    rdt: moment().format("YYYY-MM-DD HH:mm:ss"),
  };
  const add = await model.add("userrefreshtokenext", entity);
  console.log("refresh", add);
  return refreshToken;
}

router.route("/verify").post(function (req, res) {
  if (!req.body.captcha) {
    console.log("err");
    return res.json({ success: false, msg: "Chưa kiểm tra captcha!" });
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${config.captcha.secret_key}&response=${req.body.captcha}`;

  request(verifyUrl, (err, response, body) => {
    if (err) {
      console.log(err);
    }

    body = JSON.parse(body);

    if (!body.success && body.success === undefined) {
      return res.json({ success: false, msg: "Kiểm tra captcha thất bại!" });
    } else if (body.score < 0.5) {
      return res.json({
        success: false,
        msg: "Xin lỗi, Bạn là một con bot!",
        score: body.score,
      });
    }

    // return json message or continue with your function. Example: loading new page, ect
    return res.json({
      success: true,
      msg: "captcha verification passed",
      score: body.score,
    });
  });
});

// router.route("/change_password").post(async function (req, res) {
//   const rows = await model.single_by_id("tbluser", req.tokenPayload.userID);
//   if (rows.length === 0) {
//     return res.status(401).json({ success: false, error: "Not found user" });
//   } else {
//     var newPassword = req.body.new_password;
//     var oldPassword = req.body.old_password;
//     var passwordHash = rows.password;
//     const rs = bcrypt.compareSync(oldPassword, passwordHash);
//     if(!rs){
//         return res.status(401).json({
//             message: "Failed",
//             error: "Mật khẩu bạn nhập vào không đúng!"
//         });
//     }else{
//         model.update_password("tbluser", newPassword, req.tokenPayload.userID);
//         return res.json({ success: true, error: "" });
//     };
// }})

router.route("/refresh").post(async function (req, res) {
  jwt.verify(
    req.body.accessToken,
    config.JWT.secret_key,
    { ignoreExpiration: true },
    async function (err, payload) {
      console.log(err);
      console.log(payload);
      const verifyRfToken = await model.verify_refresh_token(
        payload.userID,
        req.body.refreshToken
      );

      if (verifyRfToken === false) {
        throw createError(400, "Refresh token không đúng!");
      }

      const access_token = generateAccessToken(payload.userID);
      return res
        .status(200)
        .json({ message: "Success", error: "", access_token: access_token });
    }
  );
});

const generateAccessToken = (userID) => {
  const payload = {
    userID,
  };
  const token = jwt.sign(payload, config.JWT.secret_key, {
    expiresIn: config.JWT.access_token.expired_time,
  });

  return token;
};
module.exports = router;
