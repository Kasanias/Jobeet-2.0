<template>
  <div>
    <h4 class="mt-2" style="text-align: center;">{{ $route.params.id }}</h4>
    <nav class="mt-3 nav nav-pills justify-content-center">
      <a class="nav-item nav-link active" href="#p1" data-toggle="tab">Offers</a>
      <a class="nav-item nav-link" href="#p2" data-toggle="tab">Recruiters</a>
      <a class="nav-item nav-link" href="#p3" data-toggle="tab">Applications</a>
    </nav>
    <div class="tab-content ml-4">
      <div class="tab-pane active" id="p1">
        <CreateOffer :company="this.company.name" />
        <div class="row mt-2">
          <mini-offer v-for="item in this.offers" :offer="item"></mini-offer>
        </div>
      </div>
      <div class="tab-pane" id="p2">
        <div class="row">
          <div :key="r.email" v-for="r in this.recruiters" class="col">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">{{r.firstname}} {{r.lastname}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{r.email}}</h6>
                <router-link class="card-link" :to="'/profile/' + r.email">See profile</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane" id="p3">
        <div class="row mt-4">
          <div v-show="offer.applicants" :key="offer.name" v-for="offer in this.offers" class="col">
            <div class="card bg-light h-100" style="width: 40rem;">
              <div class="card-header">{{offer.name}}</div>
              <div class="card-body">
                
                <div v-for="a in offer.applicants" class="col">
                  <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">{{a}}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{a}}</h6>
                      <button type="button" class="btn btn-primary">Accept</button>
                      <router-link class="card-link ml-5" :to="'/profile/' + a">See profile</router-link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import CreateOffer from "../components/CreateOffer";
import MiniOffer from "../components/MiniOffer";
export default {
  components: {
    CreateOffer,
    MiniOffer
  },
  data() {
    return {
      user: {},
      company: {},
      offers: [],
      recruiters: []
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
        console.log("Error getting users", err);
      });

    db.collection("companies")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
          this.company = doc.data();
        }
      })
      .catch(err => {
        console.log("Error getting company", err);
      });

    db.collection("offers")
      .where("company", "==", this.$route.params.id)
      .get()
      .then(querySnapshot => {
        this.offers = querySnapshot.docs.map(doc => doc.data());
      })
      .catch(function(error) {
        console.log("Error getting offers: ", error);
      });

    db.collection("users")
      .where("company", "==", this.$route.params.id)
      .get()
      .then(querySnapshot => {
        this.recruiters = querySnapshot.docs.map(doc => doc.data());
        console.log(this.recruiters);
      })
      .catch(function(error) {
        console.log("Error getting recruiters: ", error);
      });
  }
};
</script>