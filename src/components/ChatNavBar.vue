<template>
  <section class="section">
    <aside class="menu">
      <p class="menu-label">Channels</p>
      <ul class="menu-list">
        <li><a>Room 1</a></li>
        <li><a>Room 2</a></li>
      </ul>
      <p class="menu-label">Direct Messages</p>
      <ul class="menu-list">
        <li><a>Friend 1</a></li>
        <li><a>Friend 2</a></li>
      </ul>
    </aside>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { CHATKIT_LOGIN } from "@/store/actions.type";

export default {
  name: "ChatNavBar",
  computed: {
    ...mapGetters(["currentUser"])
  },
  mounted() {
    this.$store.dispatch(CHATKIT_LOGIN, this.currentUser.userId);
  }
};
</script>
