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
        dataVerify.source_username = this.data.source_username;
		dataVerify.value = this.data.value;
		console.log(dataVerify);
        const signature=key.sign(dataVerify, 'base64');
		this.data.signature = signature;
		const secret_key = config.secret_key.secret_key;
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
		const url = 'http://localhost:8000/customer/query_information';
		const secret_key = config.secret_key.secret_key;
		console.log(secret_key);
		console.log(this.data);
		const timestamp = Date.now();
		const hash_signature = md5(timestamp + this.data + secret_key); // hash
		console.log(timestamp);
		const res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'company_id': this.company_id,
			  'timestamp': timestamp,
			  'x-signature': hash_signature	 
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