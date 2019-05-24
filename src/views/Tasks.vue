<template>
  <div>
    <p>tasks here</p>
    <p>{{ currentUser.username }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "tasks",
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>
