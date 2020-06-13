const express = require('express'); // call express
const cors = require('cors');
const bodyParser = require('body-parser');
require('express-async-errors');

const app = express(); // define our app using express

const port = process.env.PORT || 8000; // set our port

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


require('./middlewares/routes.mdw')(app);

app.use((req, res, next)=>{
    res.status(statusCode).json({message: "Failed", err: "Không tìm thấy tài nguyên"});
})

app.use((err, req, res, next)=>{
    const statusCode = err.status || 500;
    res.status(statusCode).json({message: "Failed", err: err.message});
})

app.listen(port);
console.log('Magic happens on port ' + port);