<script>
import { Doughnut, mixins } from 'vue-chartjs'
import { mapGetters } from 'vuex'
const { reactiveData } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveData],
  data () {
    return {
      chartData: '',
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
  watch: {
    getChartData () {
      this.loading()
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  computed: {
    ...mapGetters([
      'getChartData'
    ])
  },
  methods: {
    dynamicColors () {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      return `rgb(${r},${g},${b})`
    },
    randomBackground (data) {
      if (!data) return

      const color = []

      data.forEach(() => {
        color.push(this.dynamicColors())
      })

      return color
    },
    loading () {
      const { labels, datasets } = this.getChartData

      this.chartData = {
        labels: labels,
        datasets: [{
          data: datasets,
          backgroundColor: this.randomBackground(datasets)
        }]
      }
    }
  }
}
</script>

<style>
</style>
