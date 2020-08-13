const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const numeral = require("numeral");
const bcrypt = require("bcrypt");
const transporter = require("../../utils/email");

router.route("/get_user_login_info").get(async function (req, res) {
  console.log("UserID", req.tokenPayload.userID);
  const user = await model.single_by_id("tbluser", req.tokenPayload.userID);
  const data = user[0];
  delete data.password;
  delete data.verify;
  delete data.is_active;
  data.bank_balance = numeral(data.bank_balance).format("0,0") + " ₫";
  if (!user) {
    return res
      .status(400)
      .json({ message: "Failed", error: "Không tìm thấy người dùng" });
  }

  return res.status(200).json({ message: "Success", error: "", user: user[0] });
});

router.route("/banks").get(async function (req, res) {
  const banks = await model.all("tblbank");
  return res.status(200).json({ message: "Success", error: "", banks });
});

router.route("/change_password").post(async function (req, res) {
  var userID = req.tokenPayload.userID;
  var newPassword = req.body.new_password;
  var oldPassword = req.body.old_password;
  const rows = await model.single_by_id("tbluser", userID);
  var passwordHash = rows[0].password;
  if (rows.length === 0) {
    return res
      .status(401)
      .json({ success: false, error: "Không tìm thấy người dùng." });
  } else {
    console.log("req.body: " + req.body);
    const rs = bcrypt.compareSync(oldPassword, passwordHash);
    if (!rs) {
      return res.status(401).json({
        success: false,
        error: "Mật khẩu không đúng!",
      });
    } else {
      var id = { id: userID };
      var entity = { password: bcrypt.hashSync(newPassword, 10) };
      model.update_password("tbluser", entity, id);
      return res.json({ success: true, error: "" });
    }
  }
});
module.exports = router;
