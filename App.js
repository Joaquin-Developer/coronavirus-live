/**
 * Coronavirus-live App.js
 * Version 1.1
 * Show data in html.table element
 * By Joaquin-Parrilla
 */

async function showDataInTable(){
    // call this function from index.html document
    const data = await getData();
    const table = document.querySelector('#dataTable'); //html element
    var selectElem = document.getElementById("country");    // html element
    var countryName = selectElem.options[selectElem.selectedIndex].text; // text value

    data.forEach(item => {
        if(item.countryregion == countryName){
            const coursed = item.confirmed - (item.deaths + item.recovered);
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
                        <td>${item.confirmed}</td>
                        <td>${item.recovered}</td>
                        <td>${item.deaths}</td>
                        <td>${coursed}</td>
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
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>




            `;
        }
    });

}

async function getData(){
    const response = fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest');
    const data = await (await response).json();
    return data;
}
console.log(getData());

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
async function renderData(){
    const data = await getData();
    console.log(data); // confirm data

}
**/

function test(){
    // tests
    const cadena = "2020-02-25T15:30"
    const año = cadena[0] + cadena[1] + cadena[2] + cadena[3];
    const mes = cadena[5] + cadena[6];
    const dia = cadena[8] + cadena[9];

    alert(dia + '/' + mes + '/' + año);
    var hora = "";
    for (let i= 11; i <= cadena.length - 1; i++){
        hora += cadena[i];
    }
    alert(hora);
}




