const express = require('express'); // call express
const app = express(); // define our app using express
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000; // set our port
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


require('./middlewares/routes.mdw')(app);

app.listen(port);
console.log('Magic happens on port ' + port);