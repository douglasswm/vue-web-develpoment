<template>
  <nav class="navbar is-transparent is-spaced" role="navigation">
    <div class="navbar-brand">
      <a class="navbar-item"> <RabbitLogo class="logo" /> </a>
    </div>

    <div v-if="!isAuthenticated" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" exact :to="{ name: 'home' }">
          <span class="icon"> <i class="fas fa-home"></i> </span>
          <span> Home </span>
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-light" exact :to="{ name: 'login' }">
              Log In
            </router-link>
            <router-link
              class="button is-link"
              exact
              :to="{ name: 'register' }"
            >
              <h6 class="title is-6 reg">GET STARTED</h6>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="navbar-menu">
      <div class="navbar-end">
        <div>
          <router-link class="navbar-item" exact :to="{ name: 'home' }">
            <span class="icon"> <i class="fas fa-home"></i> </span>
            <span> Home </span>
          </router-link>
        </div>
        <div>
          <router-link class="navbar-item" exact :to="{ name: 'chat' }">
            <span class="icon"> <i class="far fa-comments"></i> </span>
            <span> Chat </span>
          </router-link>
        </div>
        <div>
          <router-link class="navbar-item" exact :to="{ name: 'tasks' }">
            <span class="icon"> <i class="fas fa-tasks"></i> </span>
            <span> Tasks </span>
          </router-link>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <router-link
            class="navbar-link"
            v-if="currentUser.username"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.username }
            }"
          >
            <span> {{ currentUser.username }} </span>
          </router-link>
          <div class="navbar-dropdown is-boxed">
            <router-link
              class="navbar-item"
              exact
              :to="{
                name: 'profile',
                params: { username: currentUser.username }
              }"
            >
              <span class="icon"> <i class="fas fa-user-circle"></i> </span>
              <span> Profile </span>
            </router-link>
            <router-link class="navbar-item" exact :to="{ name: 'settings' }">
              <span class="icon"> <i class="fas fa-cog"></i> </span>
              <span> Settings </span>
            </router-link>
            <a @click="logout" class="navbar-item">
              <span class="icon has-text-danger">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span class="has-text-danger"> Log Out </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";
import RabbitLogo from "../assets/img/bunny.svg";

export default {
  name: "RwvHeader",
  components: {
    RabbitLogo
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>

<style scoped>
.reg {
  color: #ffffff;
}
.logo {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 15px;
}
</style>
