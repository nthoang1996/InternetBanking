<template>
  <div id="app">
    <TopMenu />
    <Body/>
    <Footer />
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import Footer from './components/Footer.vue'
import Body from './components/Body.vue'
export default {
  name: 'App',
  components: {
    TopMenu,
    Footer,
    Body
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
