<template>
  <div class="message-form">
    <small class="text-muted">@{{ auth.user.username }}</small>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <input
          class="input"
          type="text"
          v-model="message"
          placeholder="Enter Message"
          autocomplete="off"
          required
        />
      </div>
      <p class="field"><button type="submit" class="button">Send</button></p>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { SEND_MESSAGE } from "@/store/actions.type";

export default {
  name: "message-form",
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState(["auth", "chat"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    async onSubmit() {
      const result = await this.$store
        .dispatch(SEND_MESSAGE, this.message)
        .then(result => console.log("MSG SUBMITTED" + result));
      if (result) {
        this.message = "";
      }
    }
  }
};
</script>
