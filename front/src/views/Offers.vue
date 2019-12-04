<template>
  <div class="card text-center m-3">
    <h3 class="card-header">Offers</h3>
    <div class="card-body">
      <div class="row ml-2 mr-2">
        <mini-offer v-for="item in this.offers" :offer="item"></mini-offer>
      </div>
    </div>
    <div class="card-footer pb-0 pt-3">
      <jw-pagination :items="offers" @changePage="onChangePage"></jw-pagination>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import MiniOffer from "../components/MiniOffer.vue";

export default {
  components: {
    MiniOffer
  },
  data() {
    return {
      offers: [],
      itemsPage: []
    };
  },
  methods: {
    onChangePage(itemsPage) {
      this.itemsPage = itemsPage;
    }
  },
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