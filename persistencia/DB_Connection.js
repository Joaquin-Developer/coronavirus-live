/**
 * MYSQL Connection with Node.js
 * @author Joaquin-Parrilla
 * 
 */



// ******************************************************************************

var mysql = require('mysql');


var con = mysql.createConnection({
    host : "localhost",
    database : "coronavirusUY",
    user : "root",
    password : ""
});

con.connect(function(error) {
    if (error) {
        console.error('Error de conexion: ' + error.stack);
        return;
    }
    console.log('Conectado con el identificador ' + con.threadId);
});

con.query('SELECT * FROM datosUruguay', function (error, results, fields) {
    if (error){
        throw error;
    } else {
        results.forEach(result => {
            console.log(result);
        });
    }
});


con.end(function(){
    console.log("Cerramos la conexion");
}); // close connection.-