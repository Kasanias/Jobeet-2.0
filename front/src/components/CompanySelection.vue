<template>
  <div>
    <div class="form-group">
      <h4>Select your company ...</h4>
      <select id="company-select" class="form-control">
        <option :key="company.name" v-for="company in this.companies">{{company.name}}</option>
      </select>
      <button @click="join()" type="button" class="btn btn-outline-primary mt-2">Join</button>
    </div>
    <h4>... or create a new one</h4>
    <router-link to="/createCompany" tag="button">Create company</router-link>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
export default {
  data() {
    return {
      companies: []
    }
  },
  methods: {
    join() {
      let c = document.getElementById("company-select").value;
      db.collection("users")
        .doc(store.getters.getUser)
        .update({
          company: c
        });

      router.push({ path: "/company/" + c });
    }
  },
  created() {
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