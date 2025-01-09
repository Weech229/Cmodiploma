<template>
    <div class="simulation">
      <div class="header">
        <h2>Симуляция системы массового обслуживания</h2>
      </div>
      <QueueSystem />
    </div>
  </template>
  
  <script>
  import QueueSystem from '../components/QueueSystem.vue'
  
  export default {
    name: 'SimulationView',
    components: {
      QueueSystem
    }
  }
  </script>
  
  <style scoped>
  .simulation {
    padding: 20px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  h2 {
    color: #2c3e50;
  }
  </style>