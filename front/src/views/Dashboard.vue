<template>
  <div>
    <div class="row">
      <div v-if="user.profile === 'applicant'" class="col-sm">
        <div class="card text-center m-3">
          <h3 class="card-header">My applications</h3>
          <div class="card-body">
            <div class="row ml-2 mr-2">
              <mini-offer v-for="item in this.myOffersPage" :offer="item"></mini-offer>
            </div>
          </div>
          <div class="card-footer pb-0 pt-3">
            <jw-pagination :items="myOffers" @changePage="onChangePage" :pageSize="pageSize"></jw-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8 ml-3">
        <h3>Suggestions</h3>
      </div>
    </div>
  </div>
</template>

<script>
//mes offres, suggestions à droite profil
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import MiniOffer from "../components/MiniOffer";
export default {
  components: {
    MiniOffer
  },
  data() {
    return {
      user: {},
      myOffers: [],
      myOffersPage: [],
      pageSize: 4
    };
  },
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
  },
  mounted() {
    db.collection("applications")
      .where("user", "===", store.getters.getUser)
      .get()
      .then(querySnapshot => {
        this.myOffers = querySnapshot.docs.map(doc => doc.data());
      })
      .catch(function(error) {
        console.log("Error getting offers: ", error);
      });
  },
  methods: {
    onChangePage(itemsPage) {
      this.myOffersPage = itemsPage;
    }
  }
};
</script>