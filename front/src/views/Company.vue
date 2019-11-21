<template>
  <div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="form-group">
          <h4>Select your company ...</h4>
          <select id="company-select" class="form-control">
            <option v-for="company in this.companies">{{company.name}}</option>
          </select>
          <button @click="join()" type="button" class="btn btn-outline-primary mt-2">Join</button>
        </div>
        <h4>... or create a new one</h4>
        <router-link to="/createCompany" tag="button">Create company</router-link>
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
  methods: {
    join() {
      let c = document.getElementById("company-select").value;
      let company = this.companies.filter(function(doc) {
        return doc.name === c
      })[0]
      db.collection("users")
        .doc(store.getters.getUser)
        .update({
          company: company
        });

      router.push({path: "/company/" + company.id })
    }
  },
  created() {
    console.log("created")
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