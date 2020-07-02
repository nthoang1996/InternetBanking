const request = require('sync-request');
const NodeRSA = require('node-rsa');
const openpgp = require('openpgp');
const config = require('../config/config.json');
const key = new NodeRSA(null, {signingScheme: 'pkcs1-sha256'});
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
const model = require('../models/model')
const md5 = require('md5');
class DatBankAPI{
    constructor(data){
		this.data = data;
		this.company_id = 'TttwVLKHvXRujyllDq';
    }

    async callApiRecharge(){
		const url = 'https://dacc-internet-banking.herokuapp.com/bank/outerTransferMoney';	
		const dataVerify = this.data;
		const timestamp = Date.now();
        const signature=key.sign(dataVerify, 'hex');
		const secret_key = config.secret_key.secret_key;
		const formData = {data:this.data,signature};
		console.log(formData);
		const hash_signature = md5( formData + timestamp + secret_key); // hash
		console.log(hash_signature);
        const res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'company_id': this.company_id,
			  'ts': timestamp,
			  'sig': hash_signature			  
            },
            body: JSON.stringify(formData),
          });
        return res.body.toString('utf8');;
    }

    async callApiGetInfo(){
		const url = 'https://dacc-internet-banking.herokuapp.com/bank/getCustomer';
		const secret_key = config.secret_key.secret_key;
		const timestamp = Date.now();
		const hash_signature = md5(this.data + timestamp + secret_key); // hash
		console.log("company_id", this.company_id);
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

module.exports = DatBankAPI;