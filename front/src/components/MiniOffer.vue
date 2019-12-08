<template>
  <div class="col-lg-3 col-md-6">
    <div class="card bg-light h-100">
      <div class="card-header">{{offer.company}}</div>
      <div class="d-flex flex-column card-body">
        <h5 class="card-title mt-2">{{offer.name}}</h5>
        <p class="card-text mt-2">{{offer.short_desc}}</p>
        <div class="mt-auto w-100">
          <div class="btn btn-outline-info disabled border-info">{{offer.created_at}}</div>
          <button
            type="button"
            class="btn btn-outline-success ml-5"
            data-toggle="modal"
            :data-target="'#offerModal' + offer.name"
          >See offer</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      :id="'offerModal' + offer.name"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <center>
              <h2>{{offer.name}}</h2>
              <h5>{{offer.company}}</h5>
            </center>

            <hr />
            <p class="mb-3">
              <span style="font-weight: bold;">Description :</span>
              {{offer.full_desc}}
            </p>
            <p style="font-weight: bold;">
              Skills required:
              <span style="font-weight: normal;">{{ offer.tags.join(', ') }}</span>
            </p>
            <p v-if="offer.matchPercentage" style="font-weight: bold;">
              Match percentage:
              <span style="font-weight: normal;">{{ offer.matchPercentage}}%</span>
            </p>
            <div class="modal-footer mt-2">
              <button v-if="!this.applied" @click="apply()" type="button" class="btn btn-primary">Apply now !</button>
              <button v-else type="button" disabled class="btn btn-primary">Thanks for applying !</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import * as firebase from 'firebase';
import router from "../router/index";
import store from "../store/index";
export default {
  props: ["offer"],
  data() {
    return {
      applied: false
    };
  },
  mounted() {
    if (this.offer.applicants) {
      if (this.offer.applicants.includes(store.getters.getUser)) {
        this.applied = true
      }
      else {
        this. applied = false
      }
    }
    else {
      this.applied = false
    }
  },
  methods: {
    apply() {
      let user = store.getters.getUser;
      db.collection("offers")
        .where("name", "==", this.offer.name)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            document.ref.update({
              applicants: firebase.firestore.FieldValue.arrayUnion(user)
            });
          });
          this.applied = true
        })
        .catch(function(error) {
          console.log("Error getting offers: ", error);
        });
      db.collection("applications")
      .doc(this.offer.name + ':' + store.getters.getUser)
      .set({
        offer: this.offer,
        user: store.getters.getUser,
        status: 'pending'
      })
    }
  }
};
</script>