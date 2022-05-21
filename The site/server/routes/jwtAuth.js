const router = require("express").Router() ;
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validateInfo")





const authorization = require("../middleware/authorization");

//registering
router.post("/register" ,validInfo, async (req,res) => {
    try {
        //taking out [name,email and password]
        const {name , email , password} = req.body ;

        //check existence

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1" , [email]);
        

        if(user.rows.length !== 0) {
            return res.status(401).json("user already exist");
        }

        //Bcrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound) ;

        const bcryptPassword = await bcrypt.hash(password , salt) ;
        
        //enter the details inside the database
        const newUser = await pool.query(
        "INSERT INTO users (user_name , user_email , user_pass) VALUES ($1 , $2, $3) RETURNING *" ,
         [name,email,bcryptPassword]);
        
        //generating a jwt token
        console.log(newUser.rows[0].user_id);
        const token = jwtGenerator(newUser.rows[0].user_id) ;
        console.log(token);
        
        res.cookie("tokenV" , "sdfds" , {maxAge : 99999});
        res.cookie("qwerty","ghfdx");
        res.json({token}) ;
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})

router.post("/login" ,validInfo, async (req,res) => {
    try {
        // destructure req.body

        const {email , password} = req.body ;

        // check if user doesn't exist (error if not)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1" , [email]);
        if(user.rows.length === 0 ){
            return res.status(401).json("email or Pass not incorret");
        }
        // check if password are same

        const validPassword = await bcrypt.compare(password , user.rows[0].user_pass) ;
        
        
        if(!validPassword){
            return res.status(401).json("email or Pass not incorret");
        }

        // give them jwttoken
        const token = jwtGenerator(user.rows[0].user_id) ;
        res.cookie("token" , token);
        res.json({token});
        
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/is-verify" ,authorization, async (req,res) => {
    try {
        res.cookie("qwerty","vzfg");
        res.json(true);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error");
    }
})

// router.post("/logout" , async (req,res) => {
//     res.cookie("token" , "none" , {
//         expires : new Date(Date.now()+5*1000)
//     });
// })

module.exports = router ;
