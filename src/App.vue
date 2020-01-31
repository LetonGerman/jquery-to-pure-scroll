<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <footer>

    </footer>
  </div>
</template>

<script>
import HelloWorld from './components/Pure.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>

  header, footer {
    height: 100px;
    background-color: blue;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}
</style>
