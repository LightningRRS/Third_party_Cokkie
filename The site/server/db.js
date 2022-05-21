const Pool = require("pg").Pool ;

const pool = new Pool({
    user : "postgres" ,
    password : "Light" ,
    host : "localhost" ,
    port : 5432 ,
    database : "authentication"
});

module.exports = pool ;
