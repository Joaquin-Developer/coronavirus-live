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
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    if(dd < 10){
        dd = '0' + dd;
    }
    if(mm < 10){
        mm = '0' + mm;
    }
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
        }
    });
}



/**######################### MySQL connection ########################**/

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

getCurrentInfo();

con.end();


