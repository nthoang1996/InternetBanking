const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'hoangbankptudwnc@gmail.com',
        pass:'12345678x@X'
    }
});

module.exports =  transporter;