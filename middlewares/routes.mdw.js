const restrict = require('./auth.mdw');
const identifier = require('./identifier.mdw');
const checkHash = require('./checkHash.mdw');
module.exports = function(app) {
    app.use('/customer', identifier, checkHash, restrict, require('../routes/customer/behavior.route'));

}