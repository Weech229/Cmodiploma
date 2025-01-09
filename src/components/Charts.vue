<script>
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement, LineElement, CategoryScale } from 'chart.js';
import { useQueueStore } from '../stores/queue';
import { computed } from 'vue';

// Регистрируем компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'ChartsComponent',
  components: { LineChart },
  setup() {
    const store = useQueueStore();

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    // Создаем пустые данные для начального состояния
    const emptyChartData = {
      labels: [],
      datasets: [{
        label: 'Данные',
        data: [],
        borderColor: '#42b983'
      }]
    };

    return {
      chartOptions,
      emptyChartData
    };
  }
}
</script>