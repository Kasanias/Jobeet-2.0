<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  Navbar from "./components/Navbar"
export default {
  components : {
    Navbar
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 0;
}



#nav a.router-link-exact-active {
    color: #919191;
}
</style>
