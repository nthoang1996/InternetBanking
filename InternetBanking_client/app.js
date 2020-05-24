const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // set our port
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

require('./middlewares/routes.mdw')(app);

app.use((req, res, next)=>{
    res.status(404).send("SERVER NOT FOUND");
})

app.use((err, req, res, next)=>{
    const statusCode = err.status || 500;
    console.log(err.stack);
    res.status(statusCode).send("View error on console log.");
})

app.listen(port);
console.log('Magic happens on port ' + port);