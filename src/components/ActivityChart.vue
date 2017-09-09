<template>
  <canvas :id="chartId" :height="height" :width="width">
  </canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'activity-chart',
  beforeDestroy: function () {
    this.destroyChart()
  },
  data: function () {
    return {
      chartData: null,
      chart: null,
      chartId: 'chart'
    }
  },
  props: ['activityId', 'streamData', 'height', 'width'],
  watch: {
    activityId: {
      immediate: true,
      handler () {
        this.destroyChart()
        this.chartId = this.activityId ? `chart${this.activityId}` : 'chart'
      }
    },
    streamData: {
      immediate: true,
      async handler (data) {
        this.chartData = await Promise.resolve(data)
      }
    },
    chartData: {
      immediate: true,
      async handler () {
        this.destroyChart()
        if (this.chartData) this.drawChart()
      }
    }
  },
  methods: {
    destroyChart: function () {
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }
    },
    drawChart: function () {
      this.destroyChart()
      let ctx = document.getElementById(this.chartId)// .getContext('2d')
      let emit = this.$emit.bind(this)
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.distance.map(distance => {
            return Math.round(distance / 100) / 10
          }),
          datasets: [{
            label: 'Altitude',
            fill: false,
            borderWidth: 1,
            borderColor: 'rgb(54, 162, 235)',
            data: this.chartData.altitude
          },
          {
            label: 'Speed',
            fill: false,
            borderWidth: 1,
            borderColor: 'rgb(255, 99, 132)',
            data: this.chartData.velocity_smooth.map(mps => {
              return Number(Math.round((mps * 3.6) + 'e2') + 'e-2')
            })
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0
            },
            line: {
              tension: 0
            }
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Distance'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 10
              }
            }]
          },
          hover: {
            mode: 'index',
            intersect: false,
            onHover: function (a, b) {
              if (a.type === 'mouseout') {
                emit('mouseout')
              }
              if (b.length > 0) {
                emit('mousemove', [b[0]._index])
              }
            }
          }
        }
      })
      if (this.chartData.cadence) {
        this.chart.data.datasets.push(
          {
            label: 'Cadence',
            fill: false,
            borderWidth: 1,
            borderColor: 'rgb(153, 102, 255)',
            data: this.chartData.cadence
          })
        this.chart.update()
      }
    }
  }
}
</script>
