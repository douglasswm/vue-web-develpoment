<template>
  <div class="container column is-half is-centered">
    <p class="is-size-3 has-text-centered has-text-weight-semibold">
      Registration
    </p>
    <ul v-if="errors">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul>
    <form v-on:submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Team Name</label>
        <div class="control has-icons-left">
          <input class="input" type="text" v-model="teamName" />
          <span class="icon is-small is-left">
            <i class="fas fa-users"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input class="input" type="text" v-model="username" />
          <span class="icon is-small is-left">
            <i class="fas fa-user-circle"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" type="email" v-model="email" />
          <span class="icon is-small is-left">
            <i class="far fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input class="input" type="password" v-model="password" />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <p class="control">
          <button class="button is-success">Sign Up</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions.type";

export default {
  name: "RwvRegister",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      teamName: ""
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username,
          teamName: this.teamName
        })
        .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>
