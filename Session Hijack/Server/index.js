const express = require("express");
const app = express()
const cors = require("cors");
const { application } = require("express");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require('path');
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//set cookie as number of hits
var hits = 0;

//on getting a GET request, a cookie will be set if it does not exist yet, otherwise it will be logged
app.use('/gettoken', function (req, res) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiOWIyMzQ4OTgtMjQ3Ny00Yzg0LWE0ODUtZWM0MDUxOGNkNzdhIiwiaWF0IjoxNjUzMTE1NDE0LCJleHAiOjE2NTMxMTkwMTR9.SC-Ac1zSvZR1WHQNpVA9YOMAllZAirUsea_M0q8boQU";
    res.send(token);
    
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
