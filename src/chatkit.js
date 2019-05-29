import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import store from "./store/index";
import moment from "moment";
import {
  CLEAR_CHAT_ROOM,
  ADD_MESSAGE,
  SET_USERS,
  SET_USER_TYPING
} from "./store/mutations.type";

const INSTANCE_LOCATOR = process.env.VUE_APP_CHATKIT_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_CHATKIT_TEST_TOKEN_PROVIDER_URL;
const MESSAGE_LIMIT = parseInt(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentChatUser = null;
let activeRoom = null;

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  });
  currentChatUser = await chatManager.connect();
  return currentChatUser;
}

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }));
  store.commit(SET_USERS, members);
}

async function subscribeToRoom(roomId) {
  store.commit(CLEAR_CHAT_ROOM);
  activeRoom = await currentChatUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => {
        store.commit(ADD_MESSAGE, {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format("h:mm:ss a D-MM-YYYY")
        });
      },
      onPresenceChanged: () => {
        setMembers();
      },
      onUserStartedTyping: user => {
        store.commit(SET_USER_TYPING, user.id);
      },
      onUserStoppedTyping: () => {
        store.commit(SET_USER_TYPING, null);
      }
    }
  });
  setMembers();
  return activeRoom;
}

async function sendMessage(text) {
  const messageId = await currentChatUser.sendSimpleMessage({
    text,
    roomId: activeRoom.id
  });
  return messageId;
}

export function isTyping(roomId) {
  currentChatUser
    .isTypingIn({ roomId })
    .then(() => console.log("TYPING YES I AM"))
    .catch(err => console.log(`Error sending typing indicator: ${err}`));
}

function disconnectUser() {
  currentChatUser.disconnect();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  isTyping,
  disconnectUser
};
