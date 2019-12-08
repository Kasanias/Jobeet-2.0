<template>
  <footer>
    <div class="row">
      <div :key="chat.id" v-for="chat in chats" class="col">
        <Chat :chatName="chat.id"></Chat>
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
      chats : []
    };
  },
  created() {
    let ref = db.collection("chat");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if ((change.type = "added")) {
          let doc = change.doc.data()
          if (doc.applicant === store.getters.getUser || doc.recruiter === store.getters.getUser) {
            doc.id = change.doc.id
            this.chats.push(doc)
            console.log("adding new chat")
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