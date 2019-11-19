<template>
  <div>
    <h1>Offers</h1>
    <ul>
      <li v-for="item in this.offers">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";

export default {
  data() {
    return {
      offers: []
    };
  },
  methods: {},
  created() {
    db.collection("offers")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach(doc => {
          this.offers.push(doc.data());
        });
      });
  }
};
</script>