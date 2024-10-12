<template>
  <div class="chart-container">
    <h2 class="chart-title">User Growth</h2>
    <canvas ref="barChart" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ChartComponent1',
  components: {
    Bar,
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'New Users',
            backgroundColor: $primary - color,
            data: [40, 60, 80, 70, 90, 100],
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
            text: 'User Growth Over Time',
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
