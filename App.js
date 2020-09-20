/**
 * Coronavirus-live App.js
 * Version 1.1
 * Show data in html.table element
 * By Joaquin-Parrilla
 */

// window.tryingOnceAgain = async
async function mostrarDatos() {
    // call this function from index.html document
    
    const table = document.querySelector('#dataTable'); //html element
    var selectElem = document.getElementById("country");    // html element
    var countryName = selectElem.options[selectElem.selectedIndex].text; // text value

    const recuperados = await getActualNumbers("recovered", countryName);
    const confirmados = await getActualNumbers("confirmed", countryName);
    const muertos = await getActualNumbers("deaths", countryName);
    const cursando = confirmados - (muertos + recuperados);

    table.innerHTML = `
        <table id="DTtable" class="DTtable" border="1">
            <thead>
                <tr>
                    <th colspan="4">Casos en ${countryName} a la fecha ${getTodayDate()} </th>
                </tr>
                <tr>
                    <th>CONFIRMADOS</th>
                    <th>RECUPERADOS</th>
                    <th>MUERTES</th>
                    <th>CURSANDO ENFERMEDAD</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${confirmados}</td>
                    <td>${recuperados}</td>
                    <td>${muertos}</td>
                    <td>${cursando}</td>
                </tr>
            </tbody>
        </table>
        <br>

        <table id="DTtable" class="DTtable" border="1">
            <thead>
                <tr>
                    <th colspan="3">Comparación con el registro del dia de ayer.</th>
                </tr>
                <tr>
                    <th>Nuevos casos:</th>
                    <th>Nuevos recuperados:</th>
                    <th>Nuevas muertes:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${confirmados - (await getYesterdayNumbers("confirmed", countryName))}</td>
                    <td>${recuperados - (await getYesterdayNumbers("recovered", countryName))}</td>
                    <td>${muertos - (await getYesterdayNumbers("deaths", countryName))}</td>
                </tr>
            </tbody>
        </table>
        `;
}

// api antigua: https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest
async function getData(dato, pais) {
    const response = fetch("https://api.covid19api.com/total/country/" + pais + "/status/" + dato);
    const data = await (await response).json();
    return data;
}

async function getActualNumbers(dataType, countryName) {

    const actualData = await getData(dataType, countryName);
    return actualData[actualData.length - 1].Cases;
}

async function getYesterdayNumbers(dataType, countryName) {

    const yestData = await getData(dataType, countryName);
    return (yestData[yestData.length - 2].Cases);

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

    return dd + '/' + mm + '/' + date.getFullYear();
}

/**
 * 
 * @param {*} cadena as String
 * @author Joaquin-Parrilla
 * se debe implementar manejo de exepciones
 */
function obtenerFecha(cadena){
    
    // const cadena = "2020-02-25T15:30" - ejemplo de cadena
    const año = cadena[0] + cadena[1] + cadena[2] + cadena[3];
    const mes = cadena[5] + cadena[6];
    const dia = cadena[8] + cadena[9];

    return (dia + '/' + mes + '/' + año);
    
}
/**
 * @param {*} cadena as String
 * @author Joaquin-Parrilla
 * se debe implementar manejo de exepciones
 */
function obteherHora(cadena) {

    // const cadena = "2020-02-25T15:30"    ejemplo de cadena
    var hora = "";
    for (let i= 11; i <= cadena.length - 1; i++)
        hora += cadena[i];

    return hora;
}





