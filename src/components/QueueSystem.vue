<template>
  <div class="queue-system">
    <UI />
    
    <!-- Визуализация серверов -->
    <div class="servers-container">
      <div v-for="(status, index) in serverStatus" 
           :key="index"
           class="server-card"
           :class="{ 'is-busy': status }">
        <div class="server-icon">💻</div>
        <div class="server-name">Сервер {{ index + 1 }}</div>
        <div class="server-status">{{ status ? 'Занят' : 'Свободен' }}</div>
      </div>
    </div>

    <!-- Визуализация очереди -->
    <div class="queue-container">
      <h3>Очередь ({{ queue.length }})</h3>
      <div class="queue">
        <div v-for="(_, index) in queue" 
             :key="index" 
             class="client">
          👤
        </div>
      </div>
    </div>

    <Charts class="charts-section" />
  </div>
</template>

<script>
import { useQueueStore } from '../stores/queue'
import { storeToRefs } from 'pinia'
import Charts from './Charts.vue'
import UI from './UI.vue'

export default {
  name: 'QueueSystem',
  
  components: {
    Charts,
    UI
  },

  setup() {
    const store = useQueueStore()
    const { queue, serverStatus } = storeToRefs(store)

    return {
      queue,
      serverStatus
    }
  }
}
</script>

<style scoped>
.queue-system {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.servers-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  justify-content: center;
}

.server-card {
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
  min-width: 150px;
}

.server-card.is-busy {
  border-color: #42b983;
  background: #e8f5e9;
}

.server-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.server-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.server-status {
  font-size: 0.9em;
  color: #666;
}

.queue-container {
  margin: 40px 0;
  text-align: center;
}

.queue {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  justify-content: center;
  min-height: 80px;
}

.client {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.charts-section {
  margin-top: 40px;
}

h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}
</style>