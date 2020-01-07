<template>
  <div class="card text-center m-3">
    <div class="card-header container-fluid">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <h3>Offer</h3>
        </div>
        <div class="col pl-2">
          <select @change="onChangeSort($event)" v-model="sortSelection">
            <option disabled value>Sort by</option>
            <option value="1">Newest</option>
            <option value="2">Oldest</option>
            <option value="3">Highest matching</option>
          </select>
        </div>
      </div>
    </div>
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
import moment from "moment";

export default {
  components: {
    MiniOffer
  },
  data() {
    return {
      offers: [],
      itemsPage: [],
      pageSize: 10,
      user: {},
      sortSelection: ""
    };
  },
  methods: {
    onChangeSort(event) {
      let value = event.target.value;
      if (value == 1) {
        //newest
        this.offers.sort(
          (a, b) =>
            moment(a.created_at, "DD-MM-YYYY").toDate() <
            moment(b.created_at, "DD-MM-YYYY").toDate()
        );
      } else if (value == 2) {
        //oldest
        this.offers.sort(
          (a, b) =>
            moment(a.created_at, "DD-MM-YYYY").toDate() >
            moment(b.created_at, "DD-MM-YYYY").toDate()
        );
      } else if (value == 3) {
        this.offers.sort((a, b) => a.matchPercentage < b.matchPercentage);
      }
    },
    onChangePage(itemsPage) {
      this.itemsPage = itemsPage;
    },
    getOffers() {
      db.collection("offers")
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return;
          }
          snapshot.forEach(doc => {
            let offer = doc.data();
            var diff =
              new Date().getTime() -
              moment(offer.created_at, "DD-MM-YYYY")
                .toDate()
                .getTime();
            diff = diff / (60 * 60 * 24 * 1000);
            var diffMonths = Math.abs(Math.round(diff));
            if (diffMonths <= 31) {
              var matches = offer.tags.filter(tag => {
                return this.user.tags.includes(tag);
              }).length;
              let matchPercentage = (matches / offer.tags.length) * 100;
              offer.matchPercentage = matchPercentage;
              this.offers.push(offer);
            }
          });
        });
    }
  },
  mounted() {},
  created() {
    db.collection("users")
      .doc(store.getters.getUser)
      .get()
      .then(doc => {
        this.user = doc.data();
        this.getOffers();
      });
  }
};
</script>