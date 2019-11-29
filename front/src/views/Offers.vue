<template>
  <div>
    <h1 align="center" class="justify-content-center mt-2 mb-4">Offers</h1>
    <div class="row ml-2 mr-2">
      <mini-offer v-for="item in this.offers" :offer="item"></mini-offer>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import MiniOffer from "../components/MiniOffer.vue"

export default {
  components : {
    MiniOffer
  },
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