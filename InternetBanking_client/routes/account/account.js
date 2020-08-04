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
const transporter = require("../../utils/email");

function verifyCode(verify, code) {
  console.log(code, verify);
  if (verify.code == code) {
    const ts = Date.now();
    if (ts - verify.ts <= 300000) {
      return;
    } else {
      return "Hết thời gian xác thực";
    }
  } else {
    return "Mã bạn nhập vào không đúng";
  }
}

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

router.route("/check_email").post(async function (req, res) {
  const email = req.body.email;
  console.log(email);
  const result = await model.single_by_email("tbluser", email);
  if (result === null) {
    return res
      .status(401)
      .json({ success: false, error: "Email không tồn tài trong hệ thống." });
  }
  return res.status(200).json({ success: true });
});

router.route("/send_otp").post(async function (req, res) {
  try {
    const email = req.body.email;
    const OTP = Math.floor(Math.random() * 1000000 + 1);
    const timestamp = Date.now();
    const entity = { verify: JSON.stringify({ code: OTP, ts: timestamp }) };
    const entityEmail = { email: email };
    model.edit("tbluser", entity, entityEmail);
    const mailOption = {
      from: "hoangbankptudwnc@gmail.com", // sender this is your email here
      to: `${email}`, // receiver email2
      subject: "Xác thực tài khoản",
      html: `<h3>Chào bạn,</h3> <br>
                <p>Chúng tôi là công ty cổ phần USTechBank</p> 
                <p>Mã xác nhận của bạn là ${OTP} </p>
                <p>Mã có thời hạn hiệu lực trong 5 phút</p>
                <p>Vui lòng sử dụng mã nay để xác thực các bước tiếp theo của bạn!</p>
                <p>Cám ơn đã sử dụng dịch vụ của chúng tôi!</p>
                <h2>Trân trọng!</h2>`
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, error });
      } else {
        return res.status(200).json({ success: true, error: "" });
      }
    });
  } catch (e) {
    createError("500", e);
  }
});

router.route("/confirm_otp").post(async function (req, res) {
  const OTP = req.body.otp;
  const email = req.body.email
  const user = await model.single_by_email('tbluser',email);
  const message = verifyCode(JSON.parse(user.verify), OTP);
  if(message){
    return res.status(401).json({success:false, error: message});
  }
  return res.status(200).json({success:true});
});

router.route('/create_new_password').post(async function(req, res){
  const newPassword = req.body.password;
  const email = req.body.email;
  const user = await model.single_by_email("tbluser", email);
  var id = { id:user.id};
  var entity = {
    password: bcrypt.hashSync(newPassword,10)
  };
  const temp = model.update_password('tbluser', entity,id);
  if(temp === null){
    return res.status(500).json({success:false, error: "Tạo mật khẩu mới thất bại, vui lòng thử lại."});
  }
  return res.status(200).json({success: true, error: ""});
})
module.exports = router;
