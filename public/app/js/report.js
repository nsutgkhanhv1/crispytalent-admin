/* -------------- */
/* - Line chart - */
/* -------------- */

const ctx = document.getElementById('GrowthRateChartLine').getContext('2d');
const lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Growth',
        data: [],
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderColor: '#6259ca',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointRadius: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#77778e',
          },
          display: true,
          gridLines: {
            color: 'rgba(119, 119, 142, 0.2)',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#77778e',
            precision: 0,
          },
          display: true,
          gridLines: {
            color: 'rgba(119, 119, 142, 0.2)',
          },
          scaleLabel: {
            display: false,
            labelString: 'Thousands',
            fontColor: 'rgba(119, 119, 142, 0.2)',
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: '#77778e',
      },
    },
  },
});

function updateData(chart, label, data) {
  chart.data.labels = label;
  chart.data.datasets[0].data = data;
  chart.update();
}

function getReportUsersData(startDate, endDate) {
  $.get(
    '/report/reportUserGrowthRate',
    {
      startDate: startDate,
      endDate: endDate,
    },
    (response) => {
      updateData(lineChart, response.label, response.data);
      $('#total-growth').text(response.total);
    },
    'json',
  );
}

/* end Line chart */

/* Current Week Date */
const current = new Date();
const firstThisWeek = current.getDate() - current.getDay() + 1;
const lastThisWeek = firstThisWeek + 6;
const firstDayThisWeek = new Date(current.setDate(firstThisWeek))
  .toISOString()
  .split('T')[0];
const lastDayThisWeek = new Date(current.setDate(lastThisWeek))
  .toISOString()
  .split('T')[0];
/* Current Week Date */

/* Init Date range picker */

let startDatePicked = firstDayThisWeek;
let endDatePicked = lastDayThisWeek;
$(function () {
  $('#daterange').daterangepicker({
    startDate: new Date(current.setDate(firstThisWeek)),
    endDate: new Date(current.setDate(lastThisWeek)),
  });

  $('input[name="daterange"]').daterangepicker(
    {
      opens: 'left',
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
      },
    },
    function (start, end, label) {
      getReportUsersData(start.toISOString(), end.toISOString());
      startDatePicked = start.toISOString();
      endDatePicked = end.toISOString();
    },
  );
});

/* end Init date range picker */

// init Line chart data

getReportUsersData(firstDayThisWeek, lastDayThisWeek);

/* ----------------- */
/* -- Peity Chart -- */
/* - weekly report - */
/* ----------------- */

$('.peity-line').peity('line');

/* end Peity Chart */

/* -------------------- */
/* -- Doughbut Chart -- */
/* -------------------- */

const datapie = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      data: [20, 20, 30, 5, 25],
      backgroundColor: ['#6259ca', '#53caed', '#01b8ff', '#f16d75', '#29ccbb'],
    },
  ],
};
const optionpie = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
};

const ctx6 = document.getElementById('chartPie');
const myPieChart6 = new Chart(ctx6, {
  type: 'doughnut',
  data: datapie,
  options: optionpie,
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  const target = $(e.target).attr('href'); // activated tab
  if (target == '#crm-users') {
    getReportUsersData(startDatePicked, endDatePicked);
  } else if (target == '#crm-assets') {
    updateData(
      myChart,
      ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      [20, 20, 30, 5, 25],
    );
  }
});

/* end Doughbut Chart */
