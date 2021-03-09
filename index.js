const express = require("express");
const path = require("path");
const app = express();
const morgan = require('morgan');

const logger = require("./myLogger");

//applies the middleware
app.use(logger);
app.use(morgan('tiny'))


//Body Parser middleware
    //json
app.use(express.json());
    //from url
app.use(express.urlencoded({extended: false}))

//gets port from env or gives 300
const PORT = process.env.PORT || 3000;

//uses the defined routes
app.use('/members', require('./routes/members'))

//set static folder so that this is unnecessary
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
