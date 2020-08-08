/**
 * Coronavirus-live App
 * Version 1.0
 * Only map, popups & markers
 * By Joaquin-Parrilla
 */


const $mapa = document.querySelector('#mapa');

const map = new window.google.maps.Map($mapa, {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 3
});
renderData();

async function getData(){
    const response = fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest');
    //const data = await response.json(); errors??
    const data = await (await response).json();
    return data;
}

const popup = new window.google.maps.InfoWindow(); // only

function renderExtraData({ confirmed, deaths, recovered, provincestate, countryregion }) {
    const coursed = confirmed - (deaths + recovered);
    return `
    <div>
        <p><strong> ${provincestate} - ${countryregion} </strong></p>
        <p>Confirmados: ${confirmed} </p>
        <p>Recuperados: ${recovered} </p>
        <p>Muertes: ${deaths} </p>
        <p>Cursando: ${coursed} </p>
    </div>
    `;
}

async function renderData(){
    const data = await getData();
    console.log(data);
    // loop array and put red markers in map:
    data.forEach(item => {
        // solo mostramos markers de paises que tengan casos confirmados:
        if(item.confirmed >= 0){
            const marker = new window.google.maps.Marker({
                position: {
                    lat: item.location.lat,
                    lng: item.location.lat,
                },
                map
            })    
            marker.addListener('click', () => {
                popup.setContent(renderExtraData())
            });
            popup.open(map, marker);
        }
    });
}


