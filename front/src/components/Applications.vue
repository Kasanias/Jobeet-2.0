<template>
  <div class="col">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <h5>{{application.offer.name}} - {{application.status}}</h5>
      </div>
      <div class="card-body">
        <router-link class="card-link" :to="'/profile/' + application.user">{{application.user}}</router-link>
        <button type="button" class="btn btn-primary ml-5" @click="show()">Application</button>
      </div>
    </div>
    <!-- Modal -->

    <modal height="auto" :scrollable="true" :name="this.modalId">
      <div class="modal-body">
        <center>
          <h2>{{application.offer.name}}</h2>
          <h5>{{application.offer.company}}</h5>
        </center>

        <hr />
        <p class="mb-3">
          <span style="font-weight: bold;">Description :</span>
          {{application.offer.full_desc}}
        </p>
        <p style="font-weight: bold;">
          Skills required:
          <span style="font-weight: normal;">{{ application.offer.tags.join(', ') }}</span>
        </p>
        <hr />
        <p class="mb-3">
          <span style="font-weight: bold;">Candidate :</span>
          {{application.user}}
        </p>
        <p style="font-weight: bold;">
          Match percentage:
          <span style="font-weight: normal;">{{this.matchPercentage}}%</span>
        </p>
        <div class="modal-footer mt-2">
          <button type="button" class="btn btn-primary" @click="accept()">Accept</button>
          <button type="button" class="btn btn-danger" @click="reject()">Reject</button>
          <button type="button" class="btn btn-default" @click="hide">Dismiss</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import Chat from "../components/Chat"
export default {
  props: ["application"],
  components: {
    Chat
  },
  data() {
    return {
      modalId: "" + this.application.offer.name + ":" + this.application.user,
      matchPercentage: 0,
      user: {}
    };
  },
  methods: {
    show() {
      this.$modal.show(this.modalId);
    },
    hide() {
      this.$modal.hide(this.modalId);
    },
    accept() {
      this.application.status = "accepted"
      db.collection("applications")
        .doc(this.modalId)
        .update({
          status : "accepted"
        });
    },
    reject() {
      this.application.status = "rejected"
      db.collection("applications")
        .doc(this.modalId)
        .update({
          status : "rejected"
        });
    }
  },
  created() {
    db.collection("users")
      .doc(this.application.user)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("User profile:", doc.data());
          this.user = doc.data();
          var matches = this.application.offer.tags.filter(tag => {
            return this.user.tags.includes(tag);
          }).length;
          this.matchPercentage = (matches / this.application.offer.tags.length) * 100;
        }
      });
  }
};
</script>