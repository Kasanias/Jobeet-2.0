<template>
  <div class="card text-center m-3">
    <h3 class="card-header">Offers</h3>
    <div class="card-body">
      <div class="row ml-2 mr-2">
        <mini-offer v-for="item in this.itemsPage" :offer="item"></mini-offer>
      </div>
    </div>
    <div class="card-footer pb-0 pt-3">
      <jw-pagination :items="offers" @changePage="onChangePage" :pageSize="pageSize"></jw-pagination>
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
      itemsPage: [],
      pageSize: 10,
      user: {}
    };
  },
  methods: {
    onChangePage(itemsPage) {
      this.itemsPage = itemsPage;
    }
  },
  mounted() {
    db.collection("offers")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach(doc => {
          let offer = doc.data()
          var matches = offer.tags.filter(tag => {
            return this.user.tags.includes(tag);
          }).length;
          let matchPercentage =
            (matches / offer.tags.length) * 100;
          offer.matchPercentage = matchPercentage
          this.offers.push(offer);
        });
      });
  },
  created() {
    db.collection("users")
      .doc(store.getters.getUser)
      .get()
      .then(doc => {
        this.user = doc.data();
      });
  }
};
</script>