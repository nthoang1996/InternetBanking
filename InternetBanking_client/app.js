const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT || 3000; // set our port
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(cookieParser());
app.use(cors())

require('./middlewares/routes.mdw')(app);

app.use((req, res, next)=>{
    res.status(404).json({success: false, error: "Không tìm thấy tài nguyên"});
})

app.use((err, req, res, next)=>{
    const statusCode = err.status || 500;
    console.log(err.stack);
    res.status(statusCode).json({success: false, error: "Đã có lỗi xảy ra, vui lòng thử lại sau"});
})

app.listen(port);
console.log('Magic happens on port ' + port);
