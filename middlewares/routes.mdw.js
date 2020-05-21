const restrict = require('./auth.mdw');
const identifier = require('./identifier.mdw');
module.exports = function(app) {
    app.use('/customer', identifier, restrict, require('../routes/customer/behavior.route'));
}