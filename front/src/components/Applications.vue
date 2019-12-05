<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <h5>{{offer.name}}</h5>
      </div>
      <div class="card-body">
        <router-link class="card-link" :to="'/profile/' + applicant">{{applicant}}</router-link>
        <button
          data-toggle="modal"
          :data-target="'#applicationModal' + offer.name + applicant"
          type="button"
          class="btn btn-primary ml-5"
        >Application</button>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      :id="'applicationModal' + offer.name + applicant"
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
              <span style="font-weight: bold;">Applicant :</span>
              {{applicant}}
            </p>
            <p style="font-weight: bold;">
              Application match:
              <span style="font-weight: normal;">tkt</span>
            </p>
            <div class="modal-footer mt-2">
              <button type="button" class="btn btn-primary">Accept application</button>
              <button type="button" disabled class="btn btn-primary">Remove application</button>
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
import router from "../router/index";
import store from "../store/index";
export default {
  props: ["offer", "applicant"]
};
</script>