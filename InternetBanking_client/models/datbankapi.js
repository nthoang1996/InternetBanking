const request = require('sync-request');
const NodeRSA = require('node-rsa');
const config = require('../config/config.json');
const model = require('../models/model')
const md5 = require('md5');
const key = new NodeRSA(null, {signingScheme: 'pkcs1-sha256'});
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
class HoangBankAPI{
    constructor(data){
		this.data = data;
		this.company_id = 'TttwVLKHvXRujyllDq';
    }

    async callApiRecharge(){
		const url = 'http://localhost:8000/customer/recharge';	
		const dataVerify = {};
		const timestamp = Date.now();
        dataVerify.ts = timestamp;
        dataVerify.source_id = data.source_id;
        dataVerify.value = data.value;
        const signature=key.sign(this.dataVerify, 'base64');
		this.data.signature = signature;
		const result = await model.single_by_idString('tblbank', 'pawGDX1Ddu');
		const secret_key = result[0].secret_key;
		const formData = JSON.stringify({data:this.data});
		const hash_signature = md5(timestamp + formData + secret_key); // hash
        const res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'company_id': this.company_id,
			  'timestamp': timestamp,
			  'x-signature': hash_signature			  
            },
            body: formData,
          });
        return res.body.toString('utf8');;
    }

    async callApiGetInfo(){
		const url = 'https://dacc-internet-banking.herokuapp.com/payment/getCustomer';
		const result = await model.single_by_idString('tblbank', 'pawGDX1Ddu');
		const secret_key = result[0].secret_key;
		const timestamp = Date.now();
		const hash_signature = md5(this.data + timestamp + secret_key); // hash
		const res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'company_id': this.company_id,
			  'ts': timestamp,
			  'sig': hash_signature	 
            },
            body: JSON.stringify(this.data),
		  },function (error, response, body) {
			  console.log(error);
			  console.log(response);
			  console.log(body);
		  })
		return res.body.toString('utf8');
    }
}

module.exports = HoangBankAPI;