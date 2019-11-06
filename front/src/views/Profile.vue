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
          <br />
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
            <div class="modal-body">
              <center>
                <form @submit="this.onSubmit">
                  <h3>Edit your profile</h3>
                  <div class="row">
                    <div class="col b">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Firstname</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Firstname"
                          v-model="user.firstname"
                        />
                      </div>
                    </div>
                    <div class="col b">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Lastname</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Lastname"
                          v-model="user.lastname"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="Description"
                      v-model="user.description"
                    />
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Bio</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="Bio"
                      v-model="user.bio"
                    />
                  </div>

                  <label for="profiletype">Add tags</label>


                  <button type="submit" class="btn btn-primary">Submit changes</button>
                </form>
               
              </center>
              
            </div>
            <div class="modal-footer">
              <center>
                <button type="button" class="btn btn-default" data-dismiss="modal">Dismiss</button>
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
  methods: {
    onSubmit() {}
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