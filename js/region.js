"use strict";
getRegions();

function getRegions() {
  let sheetId = "1jaaOv83bjlkEr6GdZgrTSeNMoahuIVeymwr7RGNlNvA";
  let sheetNumber = 2;
  let sheetUrl = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/" + sheetNumber + "/public/full?alt=json";
  console.log(sheetUrl);

  fetch(sheetUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      appendChartRegion(json.feed.entry);
    });
}

function appendChartRegion(data) {
  console.log(data);

  // prepare data
  let years = [];
  let northAverage = [];
  let southAverage = [];
  let zealandAverage = [];
  let dkAverage = [];


  for (let year of data) {
    console.log(year);
    years.push(`${year['gsx$year']['$t']}`);
    northAverage.push(year['gsx$northaverage']['$t'].replace(",", "."));
    southAverage.push(year['gsx$southaverage']['$t'].replace(",", "."));
    zealandAverage.push(year['gsx$zealandaverage']['$t'].replace(",", "."));
    dkAverage.push(year['gsx$dkaverage']['$t'].replace(",", "."));
  }

  // generate chart
  let chartRegion = document.getElementById('chart-region');
  let myChartRegion = new Chart(chartRegion, {
    type: 'line',
    data: {
      datasets: [{
          label: 'Region Nord',
          data: northAverage,
          borderColor: "#4bb131",
          fill: false

        }, {
          label: 'Region Syd',
          data: southAverage,
          borderColor: "#0b34aa",
          fill: false
        }, {
          label: 'Region Sjælland',
          data: zealandAverage,
          borderColor: "#ffe90a",
          fill: false
        }, {
          label: 'Hele Danmark',
          data: dkAverage,
          borderColor: "#f7353c",
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
      },
      legend: {
        position: 'bottom',
        labels: {
          fontColor: "black",
          boxWidth: 20,
          padding: 20
        }
      }
    }
  });
}