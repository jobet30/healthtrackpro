<template>
  <div class="chart-container">
    <h2 class="chart-title">User Distribution</h2>
    <canvas ref="pieChart" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  name: 'ChartComponent2',
  components: {
    Pie,
  },
  data() {
    return {
      chartData: {
        labels: ['Active Users', 'Inactive Users', 'Pending Users'],
        datasets: [
          {
            label: 'User Status',
            backgroundColor: [
              $primary - color,
              $secondary - color,
              $accent - color,
            ],
            data: [55, 30, 15],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'User Distribution',
          },
        },
      },
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/_variables.scss';
@include chart-container;

.chart-container {
  .chart-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 1.5rem;
    text-align: center;
    border-bottom: 2px solid $primary-color;
    padding-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  canvas {
    @include transition(all, 0.3s);
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
