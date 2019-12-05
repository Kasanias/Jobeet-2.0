<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary "
      data-toggle="modal"
      data-target="#exampleModal"
    >+ Create offer</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create offer - {{company}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <label>Short description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="short_desc"
                />
              </div>
              <div class="form-group">
                <label>Full description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Full description"
                  v-model="full_desc"
                />
              </div>
              <div class="form-group">
                <label>Tags</label>
                <select v-model="tags" multiple class="form-control">
                  <option :key="item" v-for="item in this.all_tags">{{item}}</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createOffer()" type="button" class="btn btn-primary">Create</button>
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
import firebase from 'firebase'

export default {
  props: ["company"],
  data() {
    return {
      name: "",
      short_desc: "",
      full_desc: "",
      tags: [],
      all_tags: []
    };
  },
  methods: {
    createOffer() {
      db.collection("offers")
        .add({
          name: this.name,
          short_desc : this.short_desc,
          full_desc: this.full_desc,
          tags: this.tags,
          created_at: new Date(Date.now()).toLocaleDateString(),
          company: this.company,
        })
        .then(ref => {
          console.log("Added document with ID: ", ref.id);
        });
    }
  },
  mounted() {
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