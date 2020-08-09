
//import data from './data.js';

function totalCasesChart(context){

    //const{
        //confirmed,
        //recovered,
        //deaths
    //} = data;

    const chart = new Chart(context, {
        type: 'line',
        data: {
            //labels: confirmed.map(item => item.date),
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [
                {
                    label: 'Cant. de Confirmados',
                    borderColor: 'orange',
                    //data: confirmed.map(item => item.date),
                    data: [0, 12, 18, 29, 35, 41, 52]
                },
                {
                    label: 'Cant. de Recuperados',
                    borderColor: 'green',
                    //data: recovered.map(item => item.cases)
                    data: [0, 4, 10, 18, 27, 31, 40]
                },
                {
                    label: 'Cant. de Muertes',
                    borderColor: 'red',
                    //data: deaths.map(item => item.cases)
                    data: [0, 4, 7, 10, 11, 11, 15]
                } 
            ] // end dataset
        },
        options: {
            scales: {
                xAxes:[{
                    gridLines:{
                        display: false
                    }
                }]
            },
            title: {
                // titulo del grafico 
                display: true,
                text: 'Casos de COVID-19 en Uruguay',
                fontSize: 21,
                fontColor: 'blue'
            },
            legend: {
                // elementos "Cant. recuperados, cant. muertes, etc.."
                position: 'bottom',
                labels: {
                    padding: 20, 
                    boxWidth: 18,
                    fontFamily: "Arial",
                    fontColor: "black"
                }
            },
            layout:{
                padding:{
                    right: 50,
                    left: 30,
                }
            },
            tooltips: {
                backgroundColor: "black",
                titleFontSize: 15,
                xPadding: 15,
                yPadding: 15,
                bodyFontSize: 11,
                bodySpacing: 5,
                mode: "x"
            },
            elements: {
                line: {
                    borderWidth: 5, 
                    fill: false //sin fondo gris
                }, 
                point: {
                    radius: 4,
                    borderWidth: 2,
                    backgroundColor: 'white',
                    hoverRadius: 6,
                    hoverBorderWidth: 2,
                }
            }
        }
    });
}

function renderChart(){
    const context = document.querySelector('#chart').getContext('2d');
    totalCasesChart(context);
}

renderChart();

/* Transformar la fecha Date en texto */