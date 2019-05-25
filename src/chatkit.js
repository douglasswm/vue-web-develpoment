import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
// import moment from "moment";

const INSTANCE_LOCATOR = process.env.VUE_APP_CHATKIT_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_CHATKIT_TEST_TOKEN_PROVIDER_URL;
// const MESSAGE_LIMIT = parseInt(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentChatUser = null;
// let activeRoom = null;

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  });
  currentChatUser = await chatManager.connect();
  return currentChatUser;
}

export default {
  connectUser
};
