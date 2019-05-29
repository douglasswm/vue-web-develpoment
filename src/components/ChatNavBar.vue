<template>
  <section class="section">
    <aside class="menu">
      <p class="menu-label">Channels</p>
      <ul
        class="menu-list"
        v-for="room in rooms"
        :key="room.name"
        :active="activeRoom.id === room.id"
        href="#"
        @click="onChange(room);"
      >
        <li>
          <a># {{ room.name }}</a>
        </li>
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
import { mapState, mapActions } from "vuex";
import { CHANGE_ROOM } from "@/store/actions.type";

export default {
  name: "ChatNavBar",
  computed: mapState({
    rooms: state => state.chat.rooms,
    activeRoom: state => state.chat.activeRoom
  }),
  methods: {
    ...mapActions(["changeRoom"]),
    onChange(room) {
      this.$store.dispatch(CHANGE_ROOM, room.id);
    }
  }
};
</script>
