<template>
  <div>
    <div class="container">
      <div class="span3 well">
        <center>
          <div class="card" style="width: 40rem;">
            <div class="card-body">
              <a href="#aboutModal" data-toggle="modal" data-target="#myModal">edit</a>
              <h3>{{user.firstname}} {{user.lastname}}</h3>
              <small>{{user.city}}, {{user.country}}</small>
              <p>{{user.description}}</p>
              
            </div>
          </div>
          <br>
          <p>
              <strong>Bio</strong>
              <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.
            </p>
          <hr />
            <div>
              <strong>Skills</strong>
            </div>
            <span class="badge badge-warning mr-1">HTML5/CSS</span>
            <span class="badge badge-info">Adobe CS 5.5</span>
            <span class="badge badge-info">Microsoft Office</span>
            <span class="badge badge-success">Windows XP, Vista, 7</span>
            
            <br />
        </center>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
              <h4 class="modal-title" id="myModalLabel">More About Joe</h4>
            </div>
            <div class="modal-body">
              <center>
                <h3 class="media-heading">
                  Joe Sixpack
                  <small>USA</small>
                </h3>
                <span>
                  <strong>Skills:</strong>
                </span>
                <span class="label label-warning">HTML5/CSS</span>
                <span class="label label-info">Adobe CS 5.5</span>
                <span class="label label-info">Microsoft Office</span>
                <span class="label label-success">Windows XP, Vista, 7</span>
              </center>
              <hr />
              <center>
                <p class="text-left">
                  <strong>Bio:</strong>
                  <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui, tempor sit amet commodo a, vulputate vel tellus.
                </p>
                <br />
              </center>
            </div>
            <div class="modal-footer">
              <center>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >I've heard enough about Joe</button>
              </center>
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
  data() {
    return {
      user: null
    };
  },
  mounted() {
    db.collection("users")
      .doc(this.$route.params.email)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("User profile:", doc.data());
          this.user = doc.data();
        }
      });
  }
};
</script>