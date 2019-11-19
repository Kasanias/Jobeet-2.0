/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '@/main'
import createPersistedState from 'vuex-persistedstate';
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser: state => { state.user = auth.currentUser.email; },
    logout: state => { state.user = null; }
  },

  actions: {
    login({ commit }, payload) {
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setUser')
            router.push({ path: "/" });
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    logout({ commit }) {
      auth
        .signOut()
        .then(function () {
          commit('logout');
          router.push({ path: "/login" });
        })
        .catch(function (error) {
          console.log("An error happened");
        });
    }
  }
})
