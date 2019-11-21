<template>
  <div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
          <h4>{{ $route.params.id }}</h4>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
export default {
  data() {
    return {
      user: {},
      companies: []
    };
  },
  methods: {},
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
    db.collection("companies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.companies.push({ name: doc.data().name, id: doc.id });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>