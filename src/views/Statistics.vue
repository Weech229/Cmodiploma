<template>
    <div class="statistics">
      <h2>Статистика СМО</h2>
      <div class="stats-container">
        <h3>Общая статистика работы системы</h3>
        <!-- Здесь будут графики и статистика -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StatisticsView'
  }
  </script>
  
  <style scoped>
  .statistics {
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .stats-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  </style>