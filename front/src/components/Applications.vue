<template>
  <div class="col">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <h5>{{offer.name}}</h5>
      </div>
      <div class="card-body">
        <router-link class="card-link" :to="'/profile/' + applicant">{{applicant}}</router-link>
        <button type="button" class="btn btn-primary ml-5" @click="show()">Application</button>
      </div>
    </div>
    <!-- Modal -->

    <modal height="auto" :scrollable="true" :name="this.modalId">
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
        <hr />
        <p class="mb-3">
          <span style="font-weight: bold;">Candidate :</span>
          {{applicant}}
        </p>
        <p style="font-weight: bold;">
          Match percentage:
          <span style="font-weight: normal;">{{this.matchPercentage}}%</span>
        </p>
        <div class="modal-footer mt-2">
          <button type="button" class="btn btn-primary">Accept</button>
          <button type="button" disabled class="btn btn-primary">Deny</button>
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
export default {
  props: ["offer", "applicant"],
  data() {
    return {
      modalId: "" + this.offer.name + "/" + this.applicant,
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
    }
  },
  created() {
    db.collection("users")
      .doc(this.applicant)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("User profile:", doc.data());
          this.user = doc.data();
          var matches = this.offer.tags.filter(tag => {
            console.log(this.offer.tags, "tags");

            return this.user.tags.includes(tag);
          }).length;
          this.matchPercentage = (matches / this.offer.tags.length) * 100;
        }
      });
  },
  mounted() {}
};
</script>