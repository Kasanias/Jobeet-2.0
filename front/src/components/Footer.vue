<template>
  <footer>
    <div class="row">
      <div :key="chat" v-for="chat in chats" class="col-md-2">
        <Chat :chatName="chat"></Chat>
      </div>
    </div>
  </footer>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import Chat from "../components/Chat";
export default {
  components: {
    Chat
  },
  data() {
    return {
      chats: []
    };
  },
  created() {
    let ref = db.collection("chat");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if ((change.type = "added")) {
          if (!this.chats.includes(change.doc.id)) {
            let doc = change.doc.data();
            if (
              doc.applicant === store.getters.getUser ||
              doc.recruiter === store.getters.getUser
            ) {
              this.chats.push(change.doc.id);
              console.log("adding new chat", change.doc.id);
            }
          }
        }
      });
    });
  }
};
</script>

<style>
footer {
  position: fixed;
  bottom: 0;
  height: 0px;
  width: 100%;
  line-height: 10px;
  background-color: #f5f5f5;
}
</style>