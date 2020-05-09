const restrict = require('./auth.mdw');
module.exports = function(app) {
    app.use('/customer', restrict, require('../routes/customer/behavior.route'));
}