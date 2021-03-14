// wrapping class for Chart.js object

class Grapher {
  constructor(sim) {
    this.chartColors = {
      red: 'rgb(255, 99, 132)',
      green: 'rgb(155, 189, 55)',
      grey: 'rgb(136, 136, 136)'
    };
    const options = {
      maintainAspectRatio: false,
      layout: {
        padding: 5
      },
      spanGaps: false,
      elements: {
        line: { tension: 0, borderWidth: 1.5 },
        point: { radius: 0 }
      },
      tooltips: { enabled: false },
      animation: { duration: 0 },
      hover: { animationDuration: 0 },
      responsiveAnimationDuration: 0,
      events: [],
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              display: false
            },
            stacked: true
          }
        ],
        xAxes: [
          {
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
              //   callback: function(tick, index, ticks) {
              //     if (int(tick) % 5 == 0) return tick.toLocaleString();
              //     return null;
              //   }
            }
          }
        ]
      },
      plugins: {
        filler: {
          propagate: true
        }
      }
    };
    const data = {
      labels: [0],
      datasets: [
        {
          backgroundColor: this.transparentize(this.chartColors.red),
          borderColor: this.chartColors.red,
          data: [0],
          label: 'Infectious',
          id: 'I',
          fill: 'start'
        },
        {
          backgroundColor: this.transparentize(this.chartColors.green),
          borderColor: this.chartColors.green,
          data: [sim.population],
          label: 'Healthy',
          id: 'S',
          fill: '-1'
        },
        {
          backgroundColor: this.transparentize(this.chartColors.grey),
          borderColor: this.chartColors.grey,
          data: [0],
          label: 'Recovered + Dead',
          id: 'R',
          fill: '-1'
        }
      ]
    };
    this.chart = new Chart('graph-canvas', {
      type: 'line',
      data: data,
      options: options
    });
  }

  transparentize(color, opacity) {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return Color(color)
      .alpha(alpha)
      .rgbString();
  }

  addData(sim) {
    this.chart.data.labels.push(getDaysElapsed());
    const data = sim.getLatestData();
    this.chart.data.datasets.forEach(dataset => {
      switch (dataset.id) {
        case 'S':
          dataset.data.push(data[0]);
          break;
        case 'I':
          dataset.data.push(data[1]);
          break;
        case 'R':
          dataset.data.push(data[2]);
          break;
      }
    });
    this.chart.update();
  }
}
