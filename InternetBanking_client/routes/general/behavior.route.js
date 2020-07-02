const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const numeral = require("numeral");
const bcrypt = require("bcrypt");

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
  const rows = await model.single_by_id("tbluser", req.tokenPayload.userID);
  if (rows.length === 0) {
    return res.status(401).json({ success: false, error: "Not found user" });
  } else {
    var newPassword = req.body.new_password;
    var oldPassword = req.body.old_password;
    var passwordHash = rows[0].password;
    console.log(req.body);
    const rs = bcrypt.compareSync(oldPassword, passwordHash);
    if (!rs) {
      return res.status(401).json({
        message: "Failed",
        error: "Mật khẩu bạn nhập vào không đúng!",
      });
    } else {
      var id = { id: req.tokenPayload.userID};
      var passwordHash = bcrypt.hashSync(newPassword, 10);
      var entity = { password: passwordHash };
      model.update_password("tbluser", entity, id);
      return res.json({ success: true, error: "" });
    }
  }
});
module.exports = router;
