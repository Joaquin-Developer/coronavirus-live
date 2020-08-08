/**
 * Coronavirus-live App.js
 * Version 1.1
 * Get data from API 
 * By Joaquin-Parrilla
 * Executed by BashScript
 * Execution programed all days on 11pm (Crontab)
**/

//const fetch = require("node-fetch");
global.fetch = require("node-fetch");

main();

function main(){
    getData();
    // 
}

async function getData(data){
    const response = fetch("https://api.covid19api.com/total/country/Uruguay/status/" + data);
    const data = await (await response).json();

    return data;
}

//function 

