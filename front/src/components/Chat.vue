<template>
  <div class="chat">
    <div @click="isOpen = !isOpen" class="chatHeader">
      Chat - {{chatName}}
    </div>
    <div v-show="isOpen" class="chatOpen">
    <div ref="chatArea" class="chat-area">
      <p
      :key="message.author"
        v-for="message in messages"
        class="message"
        :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }"
      >{{ message.body }}</p>
    </div>

    <div class="chat-inputs">
      <form @submit.prevent="sendMessage('in')" id="person1-form">
        <input v-model="bobMessage" id="person1-input" type="text" placeholder="Type your message" />
        <button class="submitChat" type="submit">Send</button>
      </form>
      <!-- <button @click="clearAllMessages">Clear All</button> -->
      <!-- <form @submit.prevent="sendMessage('out')" id="person2-form">
        <label for="person2-input">You</label>
        <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message" />
        <button type="submit">Send</button>
      </form> -->
    </div>
    </div>
  </div>

</template>

<script>
export default {
  props : ["chatName"],
  data() {
    return {
      isOpen: true,
      bobMessage: "",
      youMessage: "",
      messages: [
        {
          body: "Welcome to the chat, I'm Bob!",
          author: "bob"
        },
        {
          body: "Thank you Bob",
          author: "you"
        },
        {
          body: "You're most welcome",
          author: "bob"
        }
      ]
    };
  },
  methods: {
    sendMessage(direction) {
      if (!this.youMessage && !this.bobMessage) {
        return;
      }
      if (direction === "out") {
        this.messages.push({ body: this.youMessage, author: "you" });
        this.youMessage = "";
      } else if (direction === "in") {
        this.messages.push({ body: this.bobMessage, author: "bob" });
        this.bobMessage = "";
      } else {
        alert("something went wrong");
      }
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
  margin: 0 auto  auto;
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
  bottom: 0
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