"use strict";

let sheetId = "1jaaOv83bjlkEr6GdZgrTSeNMoahuIVeymwr7RGNlNvA";
let sheetNumber = 1;
let sheetUrl = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/" + sheetNumber + "/public/full?alt=json";
console.log(sheetUrl);

fetch(sheetUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendChart(json.feed.entry);
  });

function appendChart(data) {
  console.log(data);

  // prepare data
  let years = [];
  let henrik = [];
  let lars = [];
  let hans = [];
  let bodil = [];
  let jens = [];
  let allan = [];
  let lisbeth = [];
  let ryan = [];
  let finn = [];


  for (let year of data) {
    years.push(`${year['gsx$year']['$t']}`);
    henrik.push(year['gsx$henrik']['$t'].replace(",", "."));
    lars.push(year['gsx$lars']['$t'].replace(",", "."));
    hans.push(year['gsx$hans']['$t'].replace(",", "."));
    bodil.push(year['gsx$bodil']['$t'].replace(",", "."));
    jens.push(year['gsx$jens']['$t'].replace(",", "."));
    allan.push(year['gsx$allan']['$t'].replace(",", "."));
    lisbeth.push(year['gsx$lisbeth']['$t'].replace(",", "."));
    ryan.push(year['gsx$ryan']['$t'].replace(",", "."));
    finn.push(year['gsx$finn']['$t'].replace(",", "."));
  }

  // generate chart
  let chart = document.getElementById('chart');
  let myChart = new Chart(chart, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Henrik',
        data: henrik,
      borderColor: "red",
      fill: false

      }, {
        label: 'Lars',
        data: lars,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Hans',
        data: hans,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Bodil',
        data: bodil,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Jens',
        data: jens,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Allan',
        data: allan,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Lisbeth',
        data: lisbeth,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Ryan',
        data: ryan,
        borderColor: "grey",
        fill: false
      }, {
        label: 'Finn',
        data: finn,
        borderColor: "grey",
        fill: false
      }

    ],
      labels: years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
