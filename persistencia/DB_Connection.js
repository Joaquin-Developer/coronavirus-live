/**
 * MYSQL Connection with Node.js
 * @author Joaquin-Parrilla
 * 
 */

const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err){
    if(err) throw err;
    console.log("Conectado!");
});
