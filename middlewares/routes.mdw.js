module.exports = function(app) {
    app.use('/customer', require('../routes/customer/behavior.route'));
}