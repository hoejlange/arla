"use strict";
getFarmers();

let myChart;
let years = [];
let karl = [];
let lars = [];
let hans = [];
let bodil = [];
let jens = [];
let allan = [];
let lisbeth = [];
let ryan = [];
let finn = [];

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
  for (let year of data) {
    years.push(`${year['gsx$year']['$t']}`);
    karl.push(year['gsx$karl']['$t'].replace(",", "."));
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
  myChart = new Chart(chart, {
    type: 'line',
    data: {
      datasets: [{
          label: 'Karl',
          data: karl,
          borderColor: "#4bb131",
          fill: false

        }
        // ,
        // {
        //   label: 'Lars',
        //   data: lars,
        //   borderColor: "#ffcc32",
        //   fill: false
        // },
        // {
        //   label: 'Hans',
        //   data: hans,
        //   borderColor: "#006c3a",
        //   fill: false
        // },
        // {
        //   label: 'Bodil',
        //   data: bodil,
        //   borderColor: "#0b43aa",
        //   fill: false
        // },
        // {
        //   label: 'Jens',
        //   data: jens,
        //   borderColor: "#3cc4eb",
        //   fill: false
        // },
        // {
        //   label: 'Allan',
        //   data: allan,
        //   borderColor: "#7d5d8a",
        //   fill: false
        // },
        // {
        //   label: 'Lisbeth',
        //   data: lisbeth,
        //   borderColor: "#f8353c",
        //   fill: false
        // },
        // {
        //   label: 'Ryan',
        //   data: ryan,
        //   borderColor: "#ff7e05",
        //   fill: false
        // },
        // {
        //   label: 'Finn',
        //   data: finn,
        //   borderColor: "#d7e100",
        //   fill: false,
        //
        //
        // }

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
        display: false
      }
    }

  });
}


/*let button = document.getElementsByClassName("farmer-btn");
let i;

for (i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display) {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
*/

/*let x = dataset();
if (x.style.display === "none") {
  x.style.display = "block";
} else {
  x.style.display = "none";
}*/


function addDataset(name) {
  let dataset = {};
  let namebuttons = document.querySelectorAll(".farmer-btn");
  for (let i = 0; i < namebuttons.lenght; i++) {
    (function() {
      let current = document.getElementsByClassName("clicked");
      current[0].className = current[0].className.replace(" clicked", "");
      this.className += " clicked";

    });
  }
  if (name === "Lars") {
    dataset = {
      label: 'Lars',
      data: lars,
      borderColor: "#ffcc32",
      fill: false
    };
  } else if (name === "Hans") {
    dataset = {
      label: 'Hans',
      data: hans,
      borderColor: "#006c3a",
      fill: false
    };
  } else if (name === "Bodil") {
    dataset = {
      label: 'Bodil',
      data: bodil,
      borderColor: "#0b43aa",
      fill: false
    };
  } else if (name === "Jens") {
    dataset = {
      label: 'Jens',
      data: jens,
      borderColor: "#3cc4eb",
      fill: false
    };
  } else if (name === "Allan") {
    dataset = {
      label: 'Allan',
      data: allan,
      borderColor: "#7d5d8a",
      fill: false
    };
  } else if (name === "Lisbeth") {
    dataset = {
      label: 'Lisbeth',
      data: lisbeth,
      borderColor: "#f8353c",
      fill: false
    };
  } else if (name === "Ryan") {
    dataset = {
      label: 'Ryan',
      data: ryan,
      borderColor: "#ff7e05",
      fill: false
    };
  } else if (name === "Finn") {
    dataset = {
      label: 'Finn',
      data: finn,
      borderColor: "#d7e100",
      fill: false
    };
  }

  myChart.data.datasets.push(dataset);
  myChart.update();
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