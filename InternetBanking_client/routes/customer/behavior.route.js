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
const hoabankapi = require("../../models/hoabankapi");
const createError = require("http-errors");
const numeral = require("numeral");
const moment = require("moment");
const transporter = require("../../utils/email");

function verifyCode(res, verify, code) {
	console.log(code, verify);
	if (verify.code == code) {
		const ts = Date.now();
		if (ts - verify.ts <= 180000) {
			return;
		} else {
			return "Hết thời gian xác thực. Vui lòng thử lại!";
		}
	} else {
		return "Mã OTP bạn nhập vào không đúng";
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
	let username = "";
	switch (data.bank_company_id) {
		case "pawGDX1Ddu":
			const dat_data = {
				accountRequest: parseInt(sender[0].username),
				nameRequest: sender[0].name,
				stk: parseInt(data.des_username),
				amountOfMoney: parseInt(data.value),
				message: data.message,
			};
			console.log(dat_data);
			api = new datbankapi(dat_data);
			response = await api.callApiRecharge();
			verify = await verifyResult(response);
			response = JSON.parse(response);
			console.log("respond from dat", response);
			cleartext = response.cleartext;
			if (verify) {
				let res = cleartext.slice(
					cleartext.indexOf("{"),
					cleartext.indexOf("}") + 1
				);
				res = JSON.parse(res);
				username = res.username;
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
			username = response.data.username;
			break;
		case "7APW008iv5sSF1EWskRd":
			console.log(req.body);
			const hoa_data = {
				from: sender[0].username,
				to: data.des_username,
				amount: parseInt(data.value),
				description: data.message,
				type: req.body.type,
			};
			api = new hoabankapi(hoa_data);
			response = JSON.parse(await api.callApiRecharge());
			console.log("respond from hoa", response);
			const hoaBank = await model.single_by_id(
				"tblbank",
				"7APW008iv5sSF1EWskRd"
			);
			const hoaKey = new NodeRSA(hoaBank[0].public_key);
			console.log(response);
			console.log(JSON.stringify(response.payload + response.timeStamp));
			console.log(response.signNature);
			verify = hoaKey.verify(
				JSON.stringify(response.payload + response.timeStamp),
				response.signNature,
				"utf8",
				"base64"
			);
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
			des_name: username,
			value: data.value,
			type_payment: data.type,
			message: data.message,
			time: new Date(),
		};
		const addHistory = await model.add("tblhistorytransaction", entity);
		res.status(200).json({ success: true, data: response.data });
	} else {
		res.status(401).json({
			success: false,
			error: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
		});
	}
});

async function verifyResult(response) {
	response = JSON.parse(response);
	const bank = await model.single_by_id("tblbank", "pawGDX1Ddu");
	let cleartext = response.cleartext;
	console.log("respond:", response);
	console.log("cleartext:", cleartext);
	const verified = await openpgp.verify({
		message: await openpgp.cleartext.readArmored(cleartext), // parse armored message
		publicKeys: (await openpgp.key.readArmored(bank[0].public_key)).keys, // for verification
	});

	return verified.signatures[0].valid;
}

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
					return res.status(400).json({
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
					return res.status(400).json({
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
			return res.status(409).json({
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

router.route("/delete_debit").post(async function (req, res) {
	var itemDeleted_id = req.body.id;
	const userID = req.tokenPayload.userID;
	const message = req.body.message;
	const des_idUser = req.body.reminderId; //Id của người đã nhắc nợ == người sẽ nhận được thông báo.
	console.log("itemDeleted_id: ", itemDeleted_id);
	const del = await model.update_status_debitItem(
		"tbldebtreminder",
		{
			status: -1,
		},
		{
			id: itemDeleted_id,
		}
	);
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
		case "7APW008iv5sSF1EWskRd":
			api = new hoabankapi({ stk: req.body.username });
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
	let rows = [];
	console.log(req.query)
	if (req.query.type === 'not_recent') {
		rows = await model.all_by_root_id(
			"tblhistorytransaction",
			req.tokenPayload.userID
		);
	}
	if(req.query.type === 'recent'){
		let date = new Date();
		date.setMonth(date.getMonth() - 1);
		rows = await model.all_by_root_id_recent(
			"tblhistorytransaction",
			req.tokenPayload.userID,
			moment(date).format('YYYY-MM-DD')
		);
	}

	console.log(rows);

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
		else if(element.type == 3){
			element.nameType = "Được trả nợ";
			element.accountId = element.source_username;
			element.displayName = element.source_name;
			element.myClass = "my-type-get-debit";
		}
		else{
			element.displayName = element.des_name;
			element.nameType = "Trả nợ";
			element.accountId = element.des_username;
			element.myClass = "my-type-pay-debit";
		}
		if (element.bank_company_id === "TttwVLKHvXRujyllDq") {
			element.bank_name = "Cùng ngân hàng";
		} else {
			const bank = listBank.find((bank) => bank.id === element.bank_company_id);
			if (bank) {
				element.bank_name = bank.name;
			}
			else{
				element.bank_name = "Ngân hàng của Hòa";
			}
		}
	});
	return res.status(200).json({ success: true, error: "", data: rows });
});
router.route("/current_user").get(async function (req, res) {
	const rows = await model.single_by_id("tbluser", req.tokenPayload.userID);
	if (rows.length === 0) {
		return res.status(401).json({ success: false, error: "Not found user" });
	}
	return res.status(200).json({ success: true, error: "", data: rows });
});

router.route("/list_debit").get(async function (req, res) {
	const userID = req.tokenPayload.userID;
	const rows = await model.all_by_des_idUser("tbldebtreminder", userID);
	// lấy đc tên người gửi nhắc nợ (source_name)
	var debtReminder;
	for (let i = 0; i < rows.length; i++) {
		debtReminder = await model.single_by_id("tbluser", rows[i].source_id);
		rows[i].source_name = debtReminder[0].name;
		rows[i].source_STK = debtReminder[0].username;
	}
	console.log(rows);
	return res.status(200).json({ success: true, error: "", data: rows });
});

router.route("/mine_list_debit").get(async function (req, res) {
	const userID = req.tokenPayload.userID;
	const rows = await model.all_by_source_id("tbldebtreminder", userID);
	return res.status(200).json({ success: true, error: "", data: rows });
});

router.route("/get_customer_name").post(async function (req, res) {
	const bankID = req.body.bankID;
	const accountNumber = req.body.accountNumber;
	if (bankID === "TttwVLKHvXRujyllDq") {
		let customer = await model.single_by_account_number(
			"tbluser",
			accountNumber
		);
		if (customer === null)
			return res.status(404).json({
				success: false,
				error: "Not found customer",
				customerName: "",
			});
		return res
			.status(200)
			.json({ success: true, error: "", customerName: customer.name });
	} else {
		console.log("Xu ly goi API truy van thong tin khach hang.............");
	}
});

router.route("/create_debt_reminder").post(async function (req, res) {
	var userID = req.tokenPayload.userID;

	// Lấy đc idUser của người bị nhắc nợ (des_idUser)
	const des_user = await model.single_by_account_number(
		"tbluser",
		req.body.accountNumber
	);

	var entity = {
		source_id: userID,
		des_id: req.body.accountNumber,
		des_idUser: des_user.id,
		des_name: req.body.customerName,
		des_bank_id: req.body.bankID,
		des_bank_name: "Cùng Ngân Hàng",
		value: req.body.moneyNumber,
		message: req.body.debtMessage,
		status: 1,
	};
	var rows = await model.add("tbldebtreminder", entity);

	if (rows) {
		return res.status(201).json({ success: true, error: "" });
	} else {
		return res
			.status(500)
			.json({ success: false, error: "Thêm nhắc nợ thất bại." });
	}
});

router.route("/pay_debt").post(async function (req, res) {
	const FEE = 5000;
	const OTP = req.body.otp;
	const receiver_STK = req.body.receiver_STK;
	const money_number = req.body.money_number;
	const type_payment = req.body.type_payment;
	const userID = req.tokenPayload.userID;
	const debtID = req.body.debtID;
	const messages = req.body.message;

	// Xác thực mã OTP
	const user = await model.single_by_id("tbluser", userID);
	const message = verifyCode(res, JSON.parse(user[0].verify), OTP);
	if (message) {
		return res.status(401).json({ success: false, error: message });
	}

	// Xử lý thao tác chuyển khoản.
	const receiver = await model.single_by_account_number(
		"tbluser",
		receiver_STK
	);
	if (type_payment == 1) {
		// Người gửi trả phí:
		// Nguời gửi: số tiền hiện tại - tiền chuyển - phí dịch vụ
		// Người nhân: số tiền hiện tại + tiền chuyển
		var user_balance = user[0].bank_balance - money_number - FEE;
		var receiver_balance =
			parseInt(receiver.bank_balance, 10) + parseInt(money_number, 10);
	} else if (type_payment == 2) {
		// Người gửi: số tiền hiện tại - tiền chuyển
		// Người nhận: số tiền hiện tại + tiền chuyển - phí dịch vụ
		var user_balance = user[0].bank_balance - money_number;
		var receiver_balance =
			parseInt(receiver.bank_balance, 10) + parseInt(money_number, 10) - FEE;
	}

	// Kiểm tra tài khoản có đủ tiền hay không?
	if (user_balance < 50000) {
		return res.status(401).json({ success: false, error: "Tài khoản không đủ tiền để thanh toán giao dịch này." });
	}

	// Cập nhập lại Database
	await model.update_coin_customer(
		"tbluser",
		{ bank_balance: user_balance },
		{ id: userID }
	);
	await model.update_coin_customer(
		"tbluser",
		{ bank_balance: receiver_balance },
		{ id: receiver.id }
	);

	// Cập nhập lại nhắc nợ
	await model.update_status_debitItem(
		"tbldebtreminder",
		{ status: 0 },
		{ id: debtID }
	);

	// Tạo thông báo
	const rows = await model.add('tblnotify', {
		source_id: userID,
		des_idUser: receiver.id,
		message: req.body.message,
		type: 0,
		status: 1
	});

	/** Ghi vào bảng lịch sử giao dịch */
	// Phía người nhận nợ (type = 3)
	await model.add('tblhistorytransaction',{
		type: 3,
		root_id: receiver.id,
		source_username: user[0].username,
		source_name: user[0].name,
		bank_company_id: "TttwVLKHvXRujyllDq",
		des_username: receiver.username,
		des_name: receiver.name,
		value: money_number,
		type_payment: type_payment,
		message: messages,
		time: new Date()
	});
	// Phía người trả nợ (type = 4) (phần khác so với trên gồm id, type, root_id)
	await model.add('tblhistorytransaction',{
		type: 4,
		root_id: user[0].id,
		source_username: user[0].username,
		source_name: user[0].name,
		bank_company_id: "TttwVLKHvXRujyllDq",
		des_username: receiver.username,
		des_name: receiver.name,
		value: money_number,
		type_payment: type_payment,
		message: messages,
		time: new Date()
	});

	return res.status(200).json({ success: true });
});

router.route("/list_notify").get(async function (req, res) {
	const userID = req.tokenPayload.userID;
	const rows = await model.all_by_des_idUser("tblnotify", userID);
	// lấy tên người gửi đi thông báo
	for (let i = 0; i < rows.length; i++) {
		sender = await model.single_by_id("tbluser", rows[i].source_id);
		rows[i].source_name = sender[0].name;
	}

	return res.status(200).json({ success: true, error: "", data: rows });
});

router.route("/total_notify").get(async function (req, res) {
	const userID = req.tokenPayload.userID;
	const rows = await model.all_by_des_idUser("tblnotify", userID);
	let count = 0;
	for (i = 0; i < rows.length; i++) {
		if (rows[i].status === 1)
			count++;
	}
	return res.status(200).json({ success: true, error: "", data: count });
});

router.route("/resert_notify").get(async function (req, res) {
	const userID = req.tokenPayload.userID;
	await model.update_status_notify('tblnotify', { status: 0 }, { des_idUser: userID });
	return res.status(200).json({ success: true, error: "" });
});

router.route("/create_notify").post(async function (req, res) {
	const rows = await model.add('tblnotify', {
		source_id: req.tokenPayload.userID,
		des_idUser: req.body.des_id,
		message: req.body.message,
		type: req.body.type,
		status: 1
	});

	if (rows !== null) {
		return res.status(200).json({ success: true, error: "" });
	}
	return res.status(500).json({ success: false, error: "Internal Server Error" });
});
module.exports = router;
