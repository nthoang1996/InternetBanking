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
		const result = await model.single_by_idString('tblbank', this.company_id);
		const secret_key = result[0].secret_key;
		const formData = JSON.stringify({data:this.data});
		const hash_signature = md5(timestamp + formData + secret_key); // hash
        let res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'company_id': this.company_id,
			  'timestamp': timestamp,
			  'x-signature': hash_signature			  
            },
            body: formData,
          });
        return res.getBody('utf8');
    }

    async callApiGetInfo(){
		const url = 'http://localhost:8000/customer/query_information';
		const result = await model.single_by_idString('tblbank', this.company_id);
		const secret_key = result[0].secret_key;
		const timestamp = Date.now();
		const hash_signature = md5(timestamp + this.data + secret_key); // hash
		let res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'company_id': this.company_id,
			  'timestamp': timestamp,
			  'x-signature': hash_signature	 
            },
            body: JSON.stringify(this.data),
		  });
		return res.getBody('utf8');
    }
}

module.exports = HoangBankAPI;