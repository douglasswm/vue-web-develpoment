import chatkit from "../chatkit";
import { CHATKIT_LOGIN } from "./actions.type";
import { SET_ROOMS } from "./mutations.type";

const state = {
  rooms: [],
  friends: []
};
const actions = {
  async [CHATKIT_LOGIN]({ context }, userId) {
    // Connect user to ChatKit service
    const currentUser = await chatkit.connectUser(userId);
    // Save list of user's rooms in store
    const chatkit_rooms = currentUser.rooms.map(room => ({
      id: room.id,
      name: room.name,
      avatarURL: room.avatarURL
    }));
    context.commit(SET_ROOMS, chatkit_rooms);
  }
};
const mutations = {
  [SET_ROOMS](state, rooms) {
    state.rooms = rooms;
  }
};
const getters = {
  allRooms(state) {
    return state.rooms;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
