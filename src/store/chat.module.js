import chatkit from "../chatkit";
import { CHATKIT_LOGIN, CHANGE_ROOM, SEND_MESSAGE } from "./actions.type";
import {
  SET_CHAT_ERROR,
  SET_ROOMS,
  SET_LOADING,
  SET_ACTIVE_ROOM,
  CLEAR_CHAT_ROOM,
  ADD_MESSAGE,
  SET_USERS,
  SET_USER_TYPING,
  SET_SENDING,
  PURGE_CHAT
} from "./mutations.type";

function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit(SET_CHAT_ERROR, message);
}

const state = {
  chatError: null,
  userTyping: null,
  sending: false,
  loading: false,
  activeRoom: null,
  messages: [],
  rooms: [],
  users: []
};

const actions = {
  async [CHATKIT_LOGIN]({ commit }, userId) {
    try {
      commit(SET_LOADING, true);
      // Connect user to ChatKit service
      const currentUser = await chatkit.connectUser(userId);
      // Save list of user's rooms in store
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name,
        avatarURL: room.avatarURL
      }));
      commit(SET_ROOMS, rooms);

      // Subscribe user to a room
      // pick last used room, or the first one
      const activeRoom = state.activeRoom || rooms[0];
      commit(SET_ACTIVE_ROOM, {
        id: activeRoom.id,
        name: activeRoom.name
      });
      await chatkit.subscribeToRoom(activeRoom.id);

      return true;
    } catch (error) {
      handleError(commit, error);
      console.log(error);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [CHANGE_ROOM]({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit(SET_ACTIVE_ROOM, { id, name });
    } catch (error) {
      handleError(commit, error);
      console.log(error);
    }
  },
  async [SEND_MESSAGE]({ commit }, message) {
    try {
      commit(SET_CHAT_ERROR, "");
      commit(SET_SENDING, true);
      const messageId = await chatkit
        .sendMessage(message)
        .then(result => console.log("@@@@@@@" + result));
      return messageId;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit(SET_SENDING, false);
    }
  }
};
const mutations = {
  [PURGE_CHAT](state) {
    state.users = [];
    state.chatError = null;
    state.messages = [];
    state.activeRoom = null;
  },
  [SET_CHAT_ERROR](state, message) {
    state.chatError = message;
  },
  [SET_SENDING](state, status) {
    state.sending = status;
  },
  [ADD_MESSAGE](state, message) {
    state.messages.push(message);
  },
  [SET_ROOMS](state, rooms) {
    state.rooms = rooms;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_ACTIVE_ROOM](state, roomId) {
    state.activeRoom = roomId;
  },
  [CLEAR_CHAT_ROOM](state) {
    state.users = [];
    state.messages = [];
  },
  [SET_USERS](state, users) {
    state.users = users;
  },
  [SET_USER_TYPING](state, userId) {
    state.userTyping = userId;
  }
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
};
