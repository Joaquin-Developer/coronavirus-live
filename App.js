/**
 * Coronavirus-live App.js
 * Version 1.1
 * Show data in html.table element
 * By Joaquin-Parrilla
 */

console.log(getData());


async function getData(){
    const response = fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest');
    const data = await (await response).json();
    return data;
}



