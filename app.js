const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000; // set our port

require('./middlewares/routes.mdw')(app);
app.listen(port);
console.log('Magic happens on port ' + port);