<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <a class="navbar-brand" href="/">
      Jobeet
    </a>
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
          <router-link class="nav-link" to="/">Dashboard</router-link>
        </li>
        <li v-if="this.user.profile==='recruiter'" class="nav-item active">
          <router-link class="nav-link" :to='"/company/" + this.user.company'>Company</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/offers">Offers</router-link>
        </li>
        <li class="nav-item active ml-2">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>

      <ul v-if="!this.isLogged" class="navbar-nav ml-auto">
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

      <ul v-if="this.isLogged" class="navbar-nav ml-auto">
        <li class="nav-item active ml-3">
          <div class="dropdown show">
            <i class="far fa-user-circle"></i>
            <a
              class="dropdown-toggle you-button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{this.user.firstname}} {{this.user.lastname}}</a>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
              <router-link
                class="dropdown-item"
                :to="{ name: 'Profile', params: { email: this.user.email }}"
              >See profile</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="this.logout">Logout</a>
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
      user: {}
    };
  },
  methods: {
    login() {
      store.dispatch("login", this.form);
    },
    logout() {
      store.dispatch("logout");
    }
  },
  created() {
    db.collection("users")
      .doc(store.getters.getUser)
      .get()
      .then(doc => {
          this.user = doc.data();
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  },
  computed: {
    isLogged() {
      return store.getters.getUser !== null;
    }
  }
};
</script>



<style>
.you-button {
  cursor: pointer;
}
</style>