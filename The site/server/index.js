const express = require("express");
const app = express()
const cors = require("cors");
const { application } = require("express");
var cookieParser = require('cookie-parser');

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  });

//ROUTES
    //register and Login

app.use("/auth" , require("./routes/jwtAuth"));
    //dashboard
app.use("/dashboard" , require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("running at 500");
})