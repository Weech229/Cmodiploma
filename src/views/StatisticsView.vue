<template>
  <div class="statistics-page">
    <h1 class="title">Статистика СМО</h1>

    <div class="stats-content">
      <h2>Общая статистика работы системы</h2>

      <div v-if="loading" class="loading">Загрузка данных...</div>

      <div v-else-if="simulations.length === 0" class="no-data">
        Пока нет сохраненных результатов симуляций
      </div>

      <div v-else class="simulations-grid">
        <div v-for="simulation in simulations" :key="simulation._id" class="simulation-card">
          <div class="simulation-header">
            <span class="date">
              {{ new Date(simulation.createdAt).toLocaleString() }}
            </span>
          </div>

          <div class="simulation-body">
            <div class="parameters">
              <h3>Параметры симуляции</h3>
              <div class="param-item">
                <span>Серверов:</span>
                <span>{{ simulation.parameters.servers }}</span>
              </div>
              <div class="param-item">
                <span>Макс. очередь:</span>
                <span>{{ simulation.parameters.maxQueueLength }}</span>
              </div>
              <div class="param-item">
                <span>Интенсивность:</span>
                <span>{{ (simulation.parameters.arrivalRate * 100).toFixed(0) }}%</span>
              </div>
            </div>

            <div class="results">
              <h3>Результаты</h3>
              <div class="result-item">
                <span>Всего клиентов:</span>
                <span>{{ simulation.statistics.totalCustomers }}</span>
              </div>
              <div class="result-item">
                <span>Обслужено:</span>
                <span>{{ simulation.statistics.servedCustomers }}</span>
              </div>
              <div class="result-item">
                <span>Отказов:</span>
                <span>{{ simulation.statistics.rejectedCustomers }}</span>
              </div>
              <div class="result-item">
                <span>Загрузка серверов:</span>
                <span>{{ (simulation.statistics.serverUtilization * 100).toFixed(1) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'StatisticsView',

  setup() {
    const simulations = ref([])
    const loading = ref(true)

    const fetchSimulations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/simulations')
        const data = await response.json()
        simulations.value = data
      } catch (error) {
        console.error('Error fetching simulations:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchSimulations()
    })

    return {
      simulations,
      loading,
    }
  },
}
</script>

<style scoped>
.statistics-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

.stats-content {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
}

.loading,
.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1em;
}

.simulations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.simulation-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.simulation-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.date {
  color: #666;
  font-size: 0.9em;
}

.parameters,
.results {
  margin-bottom: 20px;
}

h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1em;
}

.param-item,
.result-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.param-item:last-child,
.result-item:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .simulations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
