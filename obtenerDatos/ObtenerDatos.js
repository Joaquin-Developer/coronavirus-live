/**
 * Coronavirus-live App.js
 * Version 1.1
 * Get data from API 
 * By Joaquin-Parrilla
 * Run from Bash Script
 * Execution programed all days on 11pm (Crontab)
**/

//const fetch = require("node-fetch");
global.fetch = require("node-fetch");
var mysql = require('mysql');

async function getData(){
    //const response = fetch("https://api.covid19api.com/total/country/Uruguay/status/" + data);

    const response = fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest');
    const data = await (await response).json();
    return data;
}

function getTodayDate(){
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    
    return date.getFullYear() + '-' + mm + '-' + dd;
}

async function getCurrentInfo(){
    const data = await getData();
    
    data.forEach(item => {
        if(item.countryregion == "Uruguay"){
            const confirmed = item.confirmed;
            const deaths = item.deaths;
            const recovered = item.recovered;
            const coursed = confirmed - (deaths + recovered);
            const query = 'INSERT INTO datosUruguay VALUES (NULL,' + getTodayDate() + ',' + confirmed + ',' + recovered + ',' + deaths + ',' + coursed + ')';

            //pool.on()
            pool.query(query, function(error, results) {
                if(error){
                    console.log("Se produjo un error: " + error);
                    throw error;
                } else {
                    results.forEach(result => {
                        console.log(result); // al pedo en este caso que es solo un insert :)
                    });
                }

            });

            /*
            pool.getConnection(function(err, con) {
                // Use the connection
                con.query(query, function (error, results) {
                    // And done with the connection.
                    con.release();
                    
                    // Handle error after the release.
                    if (error) throw error;
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
            */

            /**
            con.query(query, function (error, results) {
                if (error){
                    console.log("Se produjo un error: " + error);
                    throw error;
                } else {
                    results.forEach(result => {
                        console.log(result); // al pedo en este caso que es solo un insert :)
                    });
                }
            });
            **/
           pool.end();
        }
        //con.end();
    });
}



/**######################### MySQL connection ########################**/

const con = mysql.createConnection({
    host : "localhost",
    port: 3306,
    database : "coronavirusUY",
    user : "root",
    password : ""
});

let connection;
function connectDB() {
    connection  = mysql.createConnection({
        host : "localhost",
        port: 3306,
        database : "coronavirusUY",
        user : "root",
        password : ""
    });
    connection.on('error', connectDB()); // probably worth adding timeout / throttle / etc
}

const pool  = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database : "coronavirusUY"
});
/**
con.connect(function(error) {
    if (error) {
        console.error('Error de conexion: ' + error.stack);
        return;
    }
    console.log('Conectado con el identificador ' + con.threadId);
});
**/
getCurrentInfo();

// ###############################################################

