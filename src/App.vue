<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/simulation">Симуляция</router-link> |
    <router-link to="/statistics">Статистика</router-link>
  </nav>
  
  <router-view />
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>