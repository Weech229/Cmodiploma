<template>
  <div class="charts-container">
    <!-- График загрузки серверов -->
    <div class="chart">
      <h3>Загрузка серверов</h3>
      <apex-chart
        type="line"
        :options="serverLoadOptions"
        :series="serverLoadSeries"
        height="300"
      />
    </div>

    <!-- График длины очереди -->
    <div class="chart">
      <h3>Длина очереди</h3>
      <apex-chart
        type="line"
        :options="queueLengthOptions"
        :series="queueLengthSeries"
        height="300"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default defineComponent({
  name: 'SimulationCharts',
  components: {},
  props: {
    simulations: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    }

    const efficiencyData = computed(() => ({
      labels: props.simulations.map((s) => new Date(s.createdAt).toLocaleTimeString()),
      datasets: [
        {
          label: 'Загрузка серверов',
          data: props.simulations.map((s) => s.statistics.serverUtilization * 100),
          borderColor: '#42b983',
          tension: 0.1,
        },
      ],
    }))

    const serviceData = computed(() => ({
      labels: props.simulations.map((s) => new Date(s.createdAt).toLocaleTimeString()),
      datasets: [
        {
          label: 'Всего клиентов',
          data: props.simulations.map((s) => s.statistics.totalCustomers),
          borderColor: '#3490dc',
          tension: 0.1,
        },
        {
          label: 'Обслужено',
          data: props.simulations.map((s) => s.statistics.servedCustomers),
          borderColor: '#42b983',
          tension: 0.1,
        },
        {
          label: 'Отказов',
          data: props.simulations.map((s) => s.statistics.rejectedCustomers),
          borderColor: '#e3342f',
          tension: 0.1,
        },
      ],
    }))

    return {
      chartOptions,
      efficiencyData,
      serviceData,
    }
  },
})
</script>

<style scoped>
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.chart {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 300px;
}

h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  text-align: center;
}
</style>
