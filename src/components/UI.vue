<template>
  <div class="ui-controls">
    <div class="control-panel">
      <h2>Управление системой</h2>

      <div class="controls-grid">
        <div class="control-group">
          <label>
            Количество серверов:
            <input type="number" v-model.number="servers" min="1" max="5" :disabled="isRunning" />
          </label>
        </div>

        <div class="control-group">
          <label>
            Интенсивность прихода (λ):
            <div class="slider-group">
              <input type="range" v-model.number="arrivalRate" min="0.1" max="1" step="0.1" />
              <span>{{ (arrivalRate * 100).toFixed(0) }}%</span>
            </div>
          </label>
        </div>

        <div class="control-group">
          <label>
            Макс. длина очереди:
            <input
              type="number"
              v-model.number="maxQueueLength"
              min="1"
              max="20"
              :disabled="isRunning"
            />
          </label>
        </div>
      </div>

      <div class="actions">
        <button @click="toggleSimulation" :class="{ 'is-running': isRunning }">
          {{ isRunning ? 'Остановить' : 'Запустить' }}
        </button>

        <button @click="resetSimulation" class="reset-btn" :disabled="isRunning">Сбросить</button>
        <button @click="saveSimulation" class="save-btn" :disabled="!statistics.totalCustomers">
          Сохранить результаты
        </button>
      </div>
    </div>

    <div class="statistics-panel">
      <div class="stat-card">
        <h3>Общая статистика</h3>
        <div class="stat-grid">
          <div class="stat-item">
            <span class="stat-label">Всего клиентов:</span>
            <span class="stat-value">{{ statistics.totalCustomers }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Обслужено:</span>
            <span class="stat-value">{{ statistics.servedCustomers }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Отказов:</span>
            <span class="stat-value">{{ statistics.rejectedCustomers }}</span>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <h3>Эффективность</h3>
        <div class="stat-grid">
          <div class="stat-item">
            <span class="stat-label">Загрузка серверов:</span>
            <span class="stat-value">{{ (statistics.serverUtilization * 100).toFixed(1) }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Среднее время ожидания:</span>
            <span class="stat-value">{{ (statistics.averageWaitTime / 1000).toFixed(2) }} сек</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Длина очереди:</span>
            <span class="stat-value">{{ statistics.queueLength }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQueueStore } from '../stores/queue'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  name: 'UIControls',

  setup() {
    const store = useQueueStore()
    const simulationInterval = ref(null)

    const { servers, maxQueueLength, arrivalRate, isRunning, statistics } = storeToRefs(store)

    // Переместили функцию внутрь setup
    const saveSimulation = async () => {
      try {
        const simulationData = {
          parameters: {
            servers: servers.value,
            maxQueueLength: maxQueueLength.value,
            arrivalRate: arrivalRate.value,
            serviceRate: store.serviceRate,
          },
          statistics: {
            totalCustomers: statistics.value.totalCustomers,
            servedCustomers: statistics.value.servedCustomers,
            rejectedCustomers: statistics.value.rejectedCustomers,
            averageWaitTime: statistics.value.averageWaitTime,
            serverUtilization: statistics.value.serverUtilization,
          },
        }

        const response = await fetch('http://localhost:3000/api/simulations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(simulationData),
        })

        const data = await response.json()
        console.log('Simulation saved:', data)
      } catch (error) {
        console.error('Error saving simulation:', error)
      }
    }

    onMounted(() => {
      store.initialize()
    })

    const toggleSimulation = () => {
      store.toggleSimulation()

      if (store.isRunning) {
        simulationInterval.value = setInterval(() => {
          if (Math.random() < store.arrivalRate) {
            store.addCustomer()
          }
          if (Math.random() < store.serviceRate) {
            store.processServer()
          }
        }, 1000)
      } else {
        clearInterval(simulationInterval.value)
        simulationInterval.value = null
      }
    }

    const resetSimulation = () => {
      store.initialize()
    }

    onUnmounted(() => {
      if (simulationInterval.value) {
        clearInterval(simulationInterval.value)
      }
    })

    return {
      servers,
      maxQueueLength,
      arrivalRate,
      isRunning,
      statistics,
      toggleSimulation,
      resetSimulation,
      saveSimulation, // Добавили в return
    }
  },
}
</script>

<style scoped>
.ui-controls {
  max-width: 1200px;
  margin: 0 auto;
}

.control-panel {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slider-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type='number'] {
  width: 70px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input[type='range'] {
  flex: 1;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:not(.reset-btn) {
  background: #42b983;
  color: white;
}

button.is-running {
  background: #ff7675;
}

.reset-btn {
  background: #2c3e50;
  color: white;
}

.statistics-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.stat-grid {
  display: grid;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .controls-grid {
    grid-template-columns: 1fr;
  }

  .statistics-panel {
    grid-template-columns: 1fr;
  }
}
.save-btn {
  background: #3498db;
  color: white;
}

.save-btn:hover {
  background: #2980b9;
}
</style>
