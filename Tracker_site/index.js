const express = require("express");
const app = express()
const cors = require("cors");
const { application } = require("express");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = 8000;

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//set cookie as number of hits
var hits = 0;

//on getting a GET request, a cookie will be set if it does not exist yet, otherwise it will be logged
app.use('/banner', function (req, res) {

    console.log(req)
    console.log("The Site User Visited is " , req.rawHeaders[1])
    res.cookie("From_port_8000" , "yes");
    res.send("third_party-Cookie");

});

app.use('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
