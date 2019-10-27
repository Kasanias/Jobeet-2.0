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
      <ul v-if="this.isLogged" class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item ml-2">
          <router-link class="nav-link" to="/offers">Offers</router-link>
        </li>
      </ul>

      <ul v-if="!this.isLogged" class="navbar-nav mr-0">
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
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.password"
          />
        </li>
        <li class="nav-item active mr-2">
          <button type="button" @click="this.login" class="btn btn-outline-success">Login</button>
        </li>
      </ul>

      <ul v-if="this.isLogged" class="navbar-nav mr-auto">
        <li class="nav-item active ml-3">
          <div class="dropdown show">
            <a
              class="dropdown-toggle you-button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >You</a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <p class="dropdown-item" href="#">{{this.getUser.firstname}} {{this.getUser.lastname}}</p>
              <!-- <p class="dropdown-item" href="#">{{this.getUser.description}}</p> -->
              <router-link class="dropdown-item" :to="{ name: 'profile', params: { email: this.getUser.email }}">Profile</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Logout</a>
            </div>
          </div>
        </li>
        <li class="nav-item active"></li>
        <li class="nav-item active ml-2"></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      user: this.getUser
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(function(firebaseUser) {
          store.dispatch("login", firebaseUser.user.email);
          router.push("dashboard");
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  computed: {
    isLogged() {
      return store.state.user !== null;
    },
    getUser() {
      return store.state.user;
    }
  }
};
</script>



<style>

li {
  /* margin-right: 10px */
}

.you-button {
  cursor: pointer;
}

</style>