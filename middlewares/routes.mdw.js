const restrict = require('./auth.mdw');
const identifier = require('./identifier.mdw');
const checkHash = require('./checkHash.mdw');
const checkSendingTime = require('./checkSendingTime.mdw');
module.exports = function(app) {
    //app.use('/customer', identifier, checkHash, restrict, require('../routes/customer/behavior.route'));
    app.use('/customer', identifier, checkSendingTime, checkHash, restrict, require('../routes/customer/behavior.route'));

}