<template>
  <div class="home">
    <h1>Система массового обслуживания</h1>
    <div class="description">
      <h2>О системе</h2>
      <p>Моделирование работы системы массового обслуживания с возможностью настройки параметров:</p>
      <ul>
        <li>Количество каналов обслуживания</li>
        <li>Интенсивность входящего потока</li>
        <li>Максимальная длина очереди</li>
      </ul>
    </div>
    <div class="actions">
      <router-link to="/simulation" class="button primary">
        Запустить симуляцию
      </router-link>
      <router-link to="/statistics" class="button secondary">
        Просмотр статистики
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

.description {
  background: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 40px;
}

h2 {
  color: #42b983;
  margin-bottom: 20px;
}

ul {
  list-style-position: inside;
  margin: 20px 0;
}

li {
  margin: 10px 0;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.button {
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s, background-color 0.2s;
}

.button:hover {
  transform: translateY(-2px);
}

.primary {
  background: #42b983;
  color: white;
}

.primary:hover {
  background: #3aa876;
}

.secondary {
  background: #2c3e50;
  color: white;
}

.secondary:hover {
  background: #34495e;
}
</style>