<template>
  <ChatNavBar />
</template>
<script>
import { mapGetters } from "vuex";
import ChatNavBar from "@/components/ChatNavBar";
export default {
  name: "chat",
  components: {
    ChatNavBar
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
