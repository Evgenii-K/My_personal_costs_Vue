<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data () {
    return {
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [],
          hoverOffset: 4
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Costs by categories',
          fontSize: 24,
          padding: 20
        },
        legend: {
          position: 'right',
          fontSize: 18
        },
        animation: {
          animateScale: true
        },
        layout: {
          padding: {
            bottom: 400,
            top: 30
          }
        }
      }
    }
  },
  created () {
    this.data.datasets[0].data.forEach(() => {
      this.data.datasets[0].backgroundColor.push(this.dynamicColors())
    })
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  methods: {
    dynamicColors () {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      return `rgb(${r},${g},${b})`
    }
  }
}
</script>

<style>
</style>
