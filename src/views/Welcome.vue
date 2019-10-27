<template>
  <div class="container">
    <div class="row">
      <div class="col b"></div>
      <div class="col b"></div>
      <div class="col b">
        <form @submit="this.onSubmit">
          <h3>Register</h3>
          <div class="row">
            <div class="col b">
              <div class="form-group">
                <label for="exampleInputEmail1">Firstname</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Firstname"
                  v-model="form.firstname"
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
                  v-model="form.lastname"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="form.email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="form.password"
            />
          </div>
          <label for="profiletype">Profile</label>
          <div class="form-group form-check">
            <div class="row">
              <div class="col b">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="applicant"
                  v-model="form.profile"
                  checked
                />
                <label class="form-check-label" for="exampleRadios1">Applicant</label>
              </div>
              <div class="col b">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="recruiter"
                  v-model="form.profile"
                />
                <label class="form-check-label" for="exampleRadios2">Recruiter</label>
              </div>
              <div class="col b">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios3"
                  value="admin"
                  v-model="form.profile"
                />
                <label class="form-check-label" for="exampleRadios3">Admin</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/main'
import router from "../router/index"

export default {
  data() {
    return {
      form: {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        profile: "applicant",
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          console.log(data)
          let user = {
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              profile: this.form.profile,
              email: this.form.email
            }
          db.collection('users').doc(this.form.email).set(user);
          router.push("dashboard")
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
</style>