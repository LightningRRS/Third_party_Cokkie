const express = require("express");
const app = express()
const cors = require("cors");
const { application } = require("express");

//middleware
app.use(express.json());
app.use(cors());

//ROUTES
    //register and Login

app.use("/auth" , require("./routes/jwtAuth"));
    //dashboard
app.use("/dashboard" , require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("running at 500");
})