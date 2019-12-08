<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  Navbar from "./components/Navbar"
import  Footer from "./components/Footer"
import Chat from "./components/Chat"
export default {
  components : {
    Navbar, Chat, Footer
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
