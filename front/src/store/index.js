/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: null,
    user: null
  },
  getters: {
    getItems: state => {
      return state.items
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setItems: state => {
      let items = [];
 
      db.collection('items').orderBy('created_at').onSnapshot((snapshot) => {
        items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, title: doc.data().title })
        });
 
        state.items = items
      })
    },
    login(state,  email) {
      db.collection('users').doc(email).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('User logged:', doc.data());
          state.user = doc.data()
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }
  },
  actions: {
    setItems: context => {
      context.commit('setItems')
    },
    login(context, email) {
      context.commit('login', email)
    }, 
  },
  modules: {
  }
})
