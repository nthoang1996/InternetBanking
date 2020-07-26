const request = require('sync-request');
const NodeRSA = require('node-rsa');
const config = require('../config/config.json');
const model = require('../models/model')
const key = new NodeRSA(null, {signingScheme: 'pkcs1-sha256'});
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
class HoaBankAPI{
    constructor(data){
		this.data = data;
        this.company_id = 'TttwVLKHvXRujyllDq';
    }

    async callApiRecharge(){
        const hoaBank = await model.single_by_id('tblbank', '7APW008iv5sSF1EWskRd');
        const hoaKey = new NodeRSA(hoaBank[0].public_key);
		const url = 'https://api.monca.me/v1/rsa/transfers';	
        const signature=key.sign(JSON.stringify(this.data), 'base64', 'utf-8');
		const secret_key = config.secret_key.secret_key;
		const formData = this.data;
        console.log("data", formData);
        const timestamp = Date.now();
		const hash_signature =  hoaKey.encrypt(JSON.stringify(this.data)+ secret_key + timestamp + this.company_id, 'base64' ); // hash
        const res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'x-partner-code': this.company_id,
			  'x-timestamp': timestamp,
              'x-data-encrypted': hash_signature,
              'x-rsa-sign': signature
            },
            body: JSON.stringify(formData),
          });
        return res.body.toString('utf8');;
    }

    async callApiGetInfo(){
        const hoaBank = await model.single_by_id('tblbank', '7APW008iv5sSF1EWskRd');
        const hoaKey = new NodeRSA(hoaBank[0].public_key);
		const url = 'https://api.monca.me/v1/rsa/info';
		const secret_key = config.secret_key.secret_key;
		console.log(secret_key);
		console.log(this.data);
		const timestamp = Date.now();
        const hash_signature =  hoaKey.encrypt(JSON.stringify(this.data)+ secret_key + timestamp + this.company_id, 'base64' ); // hash
        console.log("public_key", hoaKey.exportKey('public'));
		console.log(timestamp);
		const res = request('POST',url,{
            headers: {
              'Content-Type': 'application/json',
			  'x-partner-code': this.company_id,
			  'x-timestamp': timestamp,
			  'x-data-encrypted': hash_signature	 
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

module.exports = HoaBankAPI;