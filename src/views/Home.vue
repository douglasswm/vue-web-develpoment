<template>
  <h1>Home Page lives here</h1>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
<style>
a.navbar-item.is-active {
  background-color: #fafafa;
  color: #3273dc;
}
</style>
