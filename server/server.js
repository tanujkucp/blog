const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
// Automatically allow cross-origin requests
app.use(cors({origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes directory
require('./routes/UserRoutes')(app);

app.listen(port, (err) =>{
    if (err) { console.log(err); }
    console.log(`Listening on port ${port}`);
});
