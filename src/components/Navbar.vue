<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Jobeet</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/test">Test</router-link>
        </li>
      </ul>

      <ul class="navbar-nav mr-0">
        <li class="nav-item active mr-2">
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="form.email"
          />
        </li>
        <li class="nav-item active">
          <input type="password" class="form-control" placeholder="Password" v-model="form.password" />
        </li>
        <li class="nav-item active ml-2">
          <button type="button" @click="this.login" class="btn btn-outline-success">Login</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth } from "@/main";
import router from "../router/index"

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log(this.form.email, this.form.password)
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(function(firebaseUser) {
          router.push("dashboard")
        })
        .catch(function(error) {
          console.error(error)
        });
    }
  }
};
</script>