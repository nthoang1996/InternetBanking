const request = require('sync-request');
const NodeRSA = require('node-rsa');
const config = require('../config/config.json');
const key = new NodeRSA(null, {signingScheme: 'pkcs1-sha256'});
key.importKey(config.secret_key.private_key.join('\n'), 'pkcs1');
class HoangBankAPI{
    constructor(data){
        this.url = 'http://localhost:8000/customer/recharge';
        this.dataVerify = {};
        this.dataVerify.ts = data.ts;
        this.dataVerify.source_id = data.source_id;
        this.dataVerify.value = data.value;
        this.data = data;
        const signature=key.sign(this.dataVerify, 'base64');
        this.data.signature = signature;
        this.formData = JSON.stringify({data:this.data});
    }

    callApi(){
        let data = {};
        let res = request('POST',this.url,{
            headers: {
              'Content-Type': 'application/json',
              'company_id': 'TttwVLKHvXRujyllDq',
            },
            body: this.formData,
          });
        return res.getBody('utf8');
    }
}

module.exports = HoangBankAPI;