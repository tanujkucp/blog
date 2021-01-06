const express = require('express');
const cors = require('cors');
let Configs = require('./config');


const app = express();
const port = 5000;
// Automatically allow cross-origin requests
app.use(cors({origin: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {MongoClient} = require("mongodb");
// Connection URI
const uri = Configs.databaseURL;
// Create a new MongoClient
const db_client = new MongoClient(uri);

db_client.connect((err, db) => {
    if (err) throw err;
    var dbo = db.db("blog");
    // Import Routes directory
    require('./routes/UserRoutes')(app, dbo);
    require('./routes/PostRoutes')(app, dbo);

});
//const db = db_client.db("blog");


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening on port ${port}`);
});
