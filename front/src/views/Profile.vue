<template>
  <div>
    <div class="container">
      <div class="span3 well">
        <center>
          <div class="card" style="width: 40rem;">
            <div class="card-body">
              <a href="#aboutModal" data-toggle="modal" data-target="#myModal">edit</a>
              <h3>{{user.firstname}} {{user.lastname}}</h3>
              <p v-if="user.company">Recruiter at {{user.company}}</p>
            </div>
          </div>
          <br />
          <p>
            <strong>Bio</strong>
            <br />
            {{user.bio}}
          </p>
          <hr />

          <div class="row">
            <div class="col"></div>
            <div class="col">
              <CompanySelection/>
            </div>
            <div class="col"></div>
          </div>

          <br />
        </center>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        tabindex="-1"
        id="myModal"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <center>
                <form>
                  <h3>Edit your profile</h3>
                  <div class="row">
                    <div class="col b">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Firstname</label>
                        <input
                          type="text"
                          class="form-control"
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
                          placeholder="Lastname"
                          v-model="user.lastname"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Bio</label>
                    <input type="text" class="form-control" placeholder="Bio" v-model="user.bio" />
                  </div>

                  <div class="form-group">
                    <label>Tags</label>
                    <select v-model="user.tags" multiple class="form-control">
                      <option :key="item" v-for="item in this.all_tags">{{item}}</option>
                    </select>
                  </div>

                  <button @click="onSubmit()" class="btn btn-primary">Submit changes</button>
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
import CompanySelection from "../components/CompanySelection"

export default {
  components : {
    CompanySelection
  },
  data() {
    return {
      user: {},
      all_tags: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submitting")
      db.collection("users")
        .doc(this.$route.params.email)
        .update(this.user);
    },
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
  },
  created() {
    db.collection("tags")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.data());
          this.all_tags.push(doc.data().name);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>