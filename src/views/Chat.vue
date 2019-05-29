<template>
  <div>
    <div class="columns">
      <div class="column is-one-fifth"><ChatNavBar /></div>
      <div class="column">
        <MessageList />
        <MessageForm />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ChatNavBar from "@/components/ChatNavBar";
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";

export default {
  name: "chat",
  components: {
    ChatNavBar,
    MessageList,
    MessageForm
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>
<style>
/* .menu-label-spacing{
        size: 10em
    } */
</style>
