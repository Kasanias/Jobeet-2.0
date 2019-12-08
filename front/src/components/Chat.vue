<template>
  <div class="chat">
    <div @click="isOpen = !isOpen" class="chatHeader">Chat - {{chatName}}</div>
    <div v-show="isOpen" class="chatOpen">
      <div ref="chatArea" class="chat-area">
        <p
          v-for="message in messages"
          class="message"
          :class="{ 'message-out': message.author === getUser, 'message-in': message.author !== getUser }"
        >{{ message.body }}</p>
      </div>

      <div class="chat-inputs">
        <!-- <form @submit.prevent="sendMessage('out')" id="person1-form">
        <input v-model="yourMessage" id="person1-input" type="text" placeholder="Type your message" />
        <button class="submitChat" type="submit">Send</button>
        </form>-->
        <!-- <button @click="clearAllMessages">Clear All</button> -->
        <form @submit.prevent="sendMessage('out')" id="person2-form">
          <input
            v-model="yourMessage"
            id="person2-input"
            type="text"
            placeholder="Type your message"
          />
          <button class="submitChat" type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/main";
import router from "../router/index";
import store from "../store/index";
import * as firebase from "firebase";

export default {
  props: ["chatName"],
  data() {
    return {
      isOpen: true,
      yourMessage: "",
      messages: [
        
      ]
    };
  },
  computed: {
    getUser() {
      return store.getters.getUser;
    }
  },
  mounted() {
    let ref = db.collection("chat").doc(this.chatName);
      ref.onSnapshot(doc => {
        console.log("Current data: ", doc.data().messages);
        this.messages = doc.data().messages
        
      });
  },
  methods: {
    sendMessage(direction) {
      if (!this.yourMessage) {
        return;
      }

      // this.messages.push({
      //   body: this.yourMessage,
      //   author: store.getters.getUser
      // });

      db.collection("chat")
        .doc(this.chatName)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            author: store.getters.getUser,
            body: this.yourMessage
          })
        })
        .catch(function(error) {
          console.log("Error getting offers: ", error);
        });
      this.yourMessage = "";

      Vue.nextTick(() => {
        let messageDisplay = this.$refs.chatArea;
        messageDisplay.scrollTop = messageDisplay.scrollHeight;
      });
    },
    clearAllMessages() {
      this.messages = [];
    }
  }
};
</script>

<style>
.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  /*   border: 1px solid #ccc; */
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto auto;
  border: 1px solid;
  border-color: #007bff;
}
.chatHeader {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.chat {
  position: absolute;
  bottom: 0;
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
  font-size: 0.8em;
}
.message-out {
  background: #007bff;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-inputs {
  display: flex;
}
.submitChat {
  height: 100%;
}
#person1-input {
  padding: 0.5em;
}
#person2-input {
  padding: 0.5em;
}
</style>