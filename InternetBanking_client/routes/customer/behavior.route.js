const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const config = require("../../config/config.json");
const NodeRSA = require("node-rsa");
const openpgp = require("openpgp");
const key = new NodeRSA(config.secret_key.public_key.join("\n"));
key.setOptions({ encryptionScheme: "pkcs1" });
const hoangbankapi = require("../../models/hoangbankapi");
const datbankapi = require("../../models/datbankapi");
const nodemailer = require("nodemailer");
const createError = require("http-errors");
const numeral = require("numeral");
const moment = require("moment");
const sleep = require("sleep");
// const transporter = require('../../utils/email')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hoangbankptudwnc@gmail.com",
    pass: "12345678x@X",
  },
});

function verifyCode(res, verify, code) {
  console.log(code, verify);
  if (verify.code == code) {
    const ts = Date.now();
    if (ts - verify.ts <= 180000) {
      return;
    } else {
      return "Hết thời gian xác thực";
    }
  } else {
    return "Mã bạn nhập vào không đúng";
  }
}

router.route("/transferAboard").post(async function (req, res) {
  // let body ={
  //     "des_username": "des_username",
  //     "value": "100000",
  //     "message": "asdasdas",
  //     "bank_company_id": "13213z2x1c32z1x3c2",
  //     "type": 1
  //     "code": 123456
  // }
  const data = req.body;
  const sender = await model.single_by_id("tbluser", req.tokenPayload.userID);
  const message = verifyCode(res, JSON.parse(sender[0].verify), req.body.code);
  if (message) {
    return res.status(401).json({ success: false, error: message });
  }
  let sder_value = parseInt(sender[0].bank_balance) - parseInt(data.value);
  if (data.type == 1) {
    sder_value -= config.config.fee;
  }
  if (sder_value < 50000) {
    return res
      .status(401)
      .json({ success: false, error: "Tài khoản không đủ tiền!" });
  }
  const update_sder = await model.edit(
    "tbluser",
    { bank_balance: sder_value },
    { id: req.tokenPayload.userID }
  );
  const formData = JSON.stringify({ data: data });
  let api = {};
  let response = {};
  let verify = false;
  switch (data.bank_company_id) {
    case "pawGDX1Ddu":
      const dat_data = {
        rgp_stk: parseInt(sender[0].username),
        stk: parseInt(data.des_username),
        amountOfMoney: parseInt(data.value),
      };
      api = new datbankapi(dat_data);
      response = await api.callApiRecharge();
      sleep.sleep(2);
      response = JSON.parse(response);
      const bank = await model.single_by_id("tblbank", "pawGDX1Ddu");
      let cleartext = response.cleartext;
      const verified = await openpgp.verify({
        message: await openpgp.cleartext.readArmored(cleartext), // parse armored message
        publicKeys: (await openpgp.key.readArmored(bank[0].public_key)).keys, // for verification
      });

      verify = verified.signatures[0].valid;
      if (verify) {
        let res = cleartext.slice(
          cleartext.indexOf("{"),
          cleartext.indexOf("}") + 1
        );
        console.log("response", res);
      } else {
        console.log("failed");
      }
      break;
    case "TttwVLKHvXRujyllDq":
      data.source_username = sender[0].username;
      data.source_name = sender[0].name;
      api = new hoangbankapi(data);
      response = JSON.parse(await api.callApiRecharge());
      verify = key.verify(response.data, response.signature, "", "base64");
      console.log(verify);
      break;
  }
  console.log("verify", verify);
  if (verify) {
    const entity = {
      type: 1,
      root_id: sender[0].id,
      source_username: sender[0].username,
      source_name: sender[0].name,
      bank_company_id: data.bank_company_id,
      des_username: data.des_username,
      des_name: response.data.username,
      value: data.value,
      type_payment: data.type,
      message: data.message,
      time: new Date(),
    };
    const addHistory = await model.add("tblhistorytransaction", entity);
    res.status(200).json({ success: true, data: response.data });
  } else {
    res
      .status(401)
      .json({
        success: false,
        error: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
      });
  }
});

router.route("/transferInternal").post(async function (req, res) {
  console.log(req.tokenPayload);
  const data = req.body;
  const sender = await model.single_by_id("tbluser", req.tokenPayload.userID);
  const sder_value = parseInt(sender[0].bank_balance) - parseInt(data.value);
  const update_sder = await model.edit(
    "tbluser",
    { bank_balance: sder_value },
    { id: req.tokenPayload.userID }
  );
  const customer = await model.single_by_id("tbluser", data.des_id);
  if (customer.length == 0) {
    return res.status(500).json({ message: "", error: "ID not found" });
  }
  const cus_value = parseInt(customer[0].bank_balance) + parseInt(data.value);
  const update_cus = await model.edit(
    "tbluser",
    { bank_balance: cus_value },
    { id: data.des_id }
  );
  const entity = {
    type: 1,
    source_id: req.tokenPayload.userID,
    bank_company_id: -1,
    des_id: data.des_id,
    value: data.value,
    message: data.message,
    time: new Date(),
  };
  console.log("entity", entity);
  const insert_his = await model.add("tblhistorytransaction", entity);
  return res.status(200).json({ message: "Success", error: "" });
});

router.route("/confirmination_Email").post(async function (req, res) {
  try {
    const data = req.body;
    const verify = Math.floor(Math.random() * 10000000 + 1);
    const ts = Date.now();
    const sender = await model.single_by_id("tbluser", req.tokenPayload.userID);
    let userdata = {
      id: req.tokenPayload.userID,
      verify: "TRUE",
    };
    res.cookie("UserInfo", userdata);
    const entityID = { id: req.tokenPayload.userID };
    const entity = { verify: JSON.stringify({ code: verify, ts: ts }) };
    const update = model.edit("tbluser", entity, entityID);
    const mailOption = {
      from: "hoangbankptudwnc@gmail.com", // sender this is your email here
      to: `${sender[0].email}`, // receiver email2
      subject: "Xác thực tài khoản",
      html: `<h3>Chào ${sender[0].name}</h3> <br>
                <p>Chúng tôi là công ty cổ phần USTechBank</p> 
                <p>Có vẻ như bạn vừa gửi một yêu cần chuyển tiền đến tài khoản ${data.des_id}</p>
                <p>Mã xác nhận của bạn là ${verify} </p>
                <p>Vui lòng sử dụng mã nay để xác thực các bước tiếp theo của bạn!</p><br>
                <p>Cám ơn đã sử dụng dịch vụ của chúng tôi!</p>`,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        res.status(500).json({ success: false, error });
      } else {
        res.status(200).json({ success: true, error: "" });
      }
    });
  } catch (e) {
    createError("500", e);
  }
});

router
  .route("/user_contact")
  .post(async function (req, res) {
    let response = "";
    let data = {};
    switch (req.body.bank_company_id) {
      case "TttwVLKHvXRujyllDq":
        const my_data = {
          usernameID: req.body.des_id,
        };
        api = new hoangbankapi({ data: my_data });
        response = await api.callApiGetInfo();
        data = JSON.parse(response);
        console.log("data", data);
        if (!data.data) {
          return res
            .status(400)
            .json({
              success: false,
              error: "Số tài khoản bạn nhập vào không tồn tại",
            });
        }
        break;
      case "pawGDX1Ddu":
        api = new datbankapi({ stk: req.body.des_id });
        response = await api.callApiGetInfo();

        data = JSON.parse(response);
        if (!data.data) {
          return res
            .status(400)
            .json({
              success: false,
              error: "Số tài khoản bạn nhập vào không tồn tại",
            });
        }
        break;
    }
    const tblContact = await model.all_by_source_id(
      "tblreceivercontact",
      req.tokenPayload.userID
    );
    const obj = tblContact.find(
      (o) =>
        o.des_id == req.body.des_id &&
        o.bank_company_id == req.body.bank_company_id
    );
    if (obj) {
      return res
        .status(409)
        .json({
          success: false,
          error:
            "Số tài khoản liên hệ bạn nhập vào đã tồn tại trong danh bạ của bạn",
        });
    }
    const entity = {
      source_id: req.tokenPayload.userID,
      ...req.body,
    };
    if (entity.name_contact == "") {
      entity.name_contact = data.data.name;
    }
    const add = await model.add("tblreceivercontact", entity);
    entity.id = add.insertId;
    return res.status(200).json({ success: true, error: "", data: entity });
  })
  .get(async function (req, res) {
    const rows = await model.all_by_source_id(
      "tblreceivercontact",
      req.tokenPayload.userID
    );
    const listBank = await model.all("tblbank");
    rows.forEach((element) => {
      if (element.bank_company_id === "TttwVLKHvXRujyllDq") {
        element.bank_name = "Cùng ngân hàng";
      } else {
        const bank = listBank.find(
          (bank) => bank.id === element.bank_company_id
        );
        if (bank) {
          element.bank_name = bank.name;
        }
      }
    });
    console.log(rows);
    return res.status(200).json({ success: true, error: "", data: rows });
  });

router
  .route("/user_contact/:contact_id")
  .put(async function (req, res) {
    const edit = await model.edit("tblreceivercontact", req.body, {
      id: req.params.contact_id,
    });
    return res.status(200).json({ success: true, error: "" });
  })
  .delete(async function (req, res) {
    console.log(req.params.contact_id);
    const del = await model.del("tblreceivercontact", {
      id: req.params.contact_id,
    });
    return res.status(200).json({ success: true, error: "" });
  });

router.route("/saving_account").get(async function (req, res) {
  const rows = await model.all_by_id_user(
    "tblsavingaccount",
    req.tokenPayload.userID
  );
  for (let i = 0; i < rows.length; i++) {
    rows[i].bank_balance = numeral(rows[i].bank_balance).format("0,0") + " ₫";
  }
  return res.status(200).json({ message: "Success", error: "", data: rows });
});

router.route("/user").post(async function (req, res) {
  let response = "";
  let data = {};
  switch (req.body.bank_id) {
    // case '':
    //     const user = await model.single_by_id('tbluser', req.body.des_id);
    //     if (user.length == 0) {
    //         return res.status(400).json({ message: "Failed", error: "User id not found" });
    //     }
    //     break;
    case "TttwVLKHvXRujyllDq":
      const my_data = {
        usernameID: req.body.username,
      };
      api = new hoangbankapi({ data: my_data });
      response = await api.callApiGetInfo();
      data = JSON.parse(response);
      console.log(data);
      if (!data.data) {
        return res
          .status(200)
          .json({ success: true, message: "Không tìm thấy người dùng" });
      }
      break;
    case "pawGDX1Ddu":
      api = new datbankapi({ stk: req.body.username });
      response = await api.callApiGetInfo();
      console.log("response", response);
      data = JSON.parse(response);
      if (!data.data) {
        return res
          .status(200)
          .json({ message: true, message: "Không tìm thấy người dùng" });
      }
      break;
  }
  res
    .status(200)
    .json({ success: true, message: "Thành công", data: data.data });
});

router.route("/list_history").get(async function (req, res) {
  const rows = await model.all_by_root_id(
    "tblhistorytransaction",
    req.tokenPayload.userID
  );
  for (let i = 0; i < rows.length; i++) {
    rows[i].bank_balance = numeral(rows[i].value).format("0,0") + " ₫";
  }
  const listBank = await model.all("tblbank");
  rows.forEach((element) => {
    element.date_display = moment(element.time).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    if (element.type_payment == 1) {
      element.type_pay = "Nguời gửi trả tiền";
    } else {
      element.type_pay = "Nguời nhận trả tiền";
    }
    if (element.type == 1) {
      element.displayName = element.des_name;
      element.nameType = "Chuyển khoản";
      element.accountId = element.des_username;
      element.myClass = "my-type-send";
    } else if (element.type == 2) {
      element.displayName = element.source_name;
      element.nameType = "Nhận tiền";
      element.accountId = element.source_username;
      element.myClass = "my-type-receive";
    }
    if (element.bank_company_id === "TttwVLKHvXRujyllDq") {
      element.bank_name = "Cùng ngân hàng";
    } else {
      const bank = listBank.find((bank) => bank.id === element.bank_company_id);
      if (bank) {
        element.bank_name = bank.name;
      }
    }
  });
  return res.status(200).json({ success: true, error: "", data: rows });
});
router.route("/current_user").get(async function (req, res) {
  const rows = await model.single_by_id("tbluser", req.tokenPayload.userID);
  if(rows.length === 0){
      return res.status(401).json({success: false, error: "Not found user"})
  }
  return res.status(200).json({ success: true, error: "", data: rows });
});
module.exports = router;
