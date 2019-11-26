<template>
  <div>
    <h4 class="mt-2" style="text-align: center;">{{ $route.params.id }}</h4>
    <nav class="mt-3 nav nav-pills justify-content-center">
      <a class="nav-item nav-link active" href="#p1" data-toggle="tab">Offers</a>
      <a class="nav-item nav-link" href="#p2" data-toggle="tab">Recruiters</a>
      <a class="nav-item nav-link" href="#p3" data-toggle="tab">Applications</a>
    </nav>
    <div class="tab-content ml-4 ">
      <div class="tab-pane active justify-content-center" id="p1">
        <CreateOffer :company="this.company.name" />
        <div class="row mt-2 justify-content-center">
          <mini-offer v-for="item in this.offers" :offer="item"></mini-offer>
        </div>
      </div>
      <div class="tab-pane" id="p2">
        <p>Some content in menu 1.</p>
      </div>
      <div class="tab-pane" id="p3">
        <p>Some content in menu 1.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import CreateOffer from "../components/CreateOffer";
import MiniOffer from "../components/MiniOffer"
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
        console.log("Error getting document", err);
      });

    db.collection("offers")
      .where("company", "==", this.$route.params.id)
      .get()
      .then(querySnapshot => {
        this.offers = querySnapshot.docs.map(doc => doc.data())
        // querySnapshot.forEach(doc => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        //   //this.offers.push(doc.data());
        // });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }
};
</script>