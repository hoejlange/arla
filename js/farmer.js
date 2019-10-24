"use strict";
getFarmers();

function getFarmers() {
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
}


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
  let chart = document.getElementById('chart-farmer');
  let myChart = new Chart(chart, {
    type: 'line',
    data: {
      datasets: [{
          label: 'Henrik',
          data: henrik,
          borderColor: "red",
          fill: false

        },
        {
          label: 'Lars',
          data: lars,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Hans',
          data: hans,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Bodil',
          data: bodil,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Jens',
          data: jens,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Allan',
          data: allan,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Lisbeth',
          data: lisbeth,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Ryan',
          data: ryan,
          borderColor: "grey",
          fill: false
        },
        {
          label: 'Finn',
          data: finn,
          borderColor: "pink",
          fill: false,


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
      responsive: true,
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

/*
let defaultLegendClickHandler = Chart.defaults.global.legend.onClick;
let newLegendClickHandler = function(e, legendItem) {
  let index = legendItem.datasetIndex;

  if (index > 0) {
    // Do the original logic
    defaultLegendClickHandler(e, legendItem);
  } else {
    let ci = this.chart;
    [
      ci.getDatasetMeta(0),
      ci.getDatasetMeta(1)
    ].forEach(function(meta) {
      meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
    });
    ci.update();
  }
};

let chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    legend: {
      onClick: newLegendClickHandler
    }
  }
}); */


// hide all charts
function hideAllCharts() {
  let charts = document.querySelectorAll(".chartWrapper");
  for (let chart of charts) {
    chart.style.display = "none";
  }
}

// show page or tab
function showChart(chartId) {
  hideAllCharts();
  document.querySelector(`#${chartId}`).style.display = "block";
  setActiveButton(chartId);
}

// sets active tabbar/ menu item
function setActiveButton(chartId) {
  let buttons = document.querySelectorAll(".toggleButton");
  for (let button of buttons) {
    console.log(button.id)
    if (`${chartId}-button` === button.id) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }
}

// set default page
function setDefaultChart() {
  let chart = "chart-farmer-wrapper";
  showChart(chart);
}

setDefaultChart();