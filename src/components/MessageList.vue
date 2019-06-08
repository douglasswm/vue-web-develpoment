<template>
  <div class="message-list">
    <hr />
    <div
      id="chat-messages"
      class="message-group"
      v-chat-scroll="{ smooth: true }"
    >
      <div class="message" v-for="(message, index) in messages" :key="index">
        <div>
          <h4 class="message-title">{{ message.name }}</h4>
          <small>@{{ message.date }}</small>
        </div>
        <p class="message-text">{{ message.text }}</p>
      </div>
    </div>
    <p v-if="userTyping">@{{ userTyping }} is typing....</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "message-list",
  computed: mapState({
    messages: state => state.chat.messages,
    userTyping: state => state.chat.userTyping
  })
};
</script>

<style>
.message-list {
  margin-bottom: 15px;
  padding-right: 15px;
}
.message-group {
  height: 65vh !important;
  overflow-y: scroll;
}
.message {
  border: 1px solid lightblue;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}
.message-title {
  font-size: 1rem;
  display: inline;
}
.message-text {
  color: gray;
  margin-bottom: 0;
}
</style>
