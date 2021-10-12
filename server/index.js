/* CONFIG */
const SRV_PORT = 9765;
/*const DB_PORT = '27017';
const DB_NAME = ''*/
const CLIENT_URL = 'http://wajihome.wajisan.eu:9005';
/* CONFIG */


/* SERVER  */
const express = require('express');
const cors = require('cors');
//const { Mongoose } = require('mongoose');
const app = express();
app.listen(SRV_PORT, () => {
    console.log("Server started on port " + SRV_PORT);
})
/* SERVER */


/* DATABASE */
/*const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:' + DB_PORT + '/' + DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB on port ' + DB_PORT);
});
db.on('error', (error) => {
    console.log(error);
});*/
/* DATABASE */



/* PARSING */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
let corsOptions = {
    origin: CLIENT_URL,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

/* CONTROLLER */

require('./routes/plugin_route.js')(app);
