const restrict = require('./auth.mdw');
const authCus = require('./authCus.mdw');
module.exports = function(app) {
    app.use('/customer', restrict, authCus, require('../routes/customer/behavior.route'));
    //app.use('/customer', restrict, require('../routes/customer/behavior.route'));
    app.use('/account', require('../routes/account/account'));
    app.use('/general', restrict, require('../routes/general/behavior.route'));
    app.use('/admin', restrict, require('../routes/admin/admin.route'));
    app.use('/employee', restrict, require('../routes/employee/employee.route'));
}