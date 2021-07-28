import { IReceiveIndividualMessage, ISendIndividualMessage } from "./types";
import users from "../../public/data.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { SOCKET_EVENTS } from "../socket";

const initialzeConversations = () => {
  const userIds = users.map((user) => user.email);
  let obj: {
    [key: string]: IReceiveIndividualMessage[];
  } = {};
  for (let i = 0; i < userIds.length; i++) {
    obj[userIds[i]] = [];
  }
  return obj;
};

interface IInitialState {
  peoples: { name: string; id: string; email: string }[];
  conversations: {
    [key: string]: IReceiveIndividualMessage[];
  };
  currentConversation: string;
}

const initialState: IInitialState = {
  peoples: users.map((user) => ({
    name: user.name,
    email: user.email,
    id: user.phone,
  })),
  conversations: initialzeConversations(),
  currentConversation: "",
};

const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<string>) => {
      state.currentConversation = action.payload;
    },
    initializeMessagesState: (state) => {
      state = { ...initialState };
    },
    addMessageToConversation: (
      state,
      action: PayloadAction<{ key: string; value: IReceiveIndividualMessage }>
    ) => {
      const { key, value } = action.payload;
      if(key && state.conversations[key]){
        let previousMessagesRaw = state.conversations[key]
        state.conversations[key] = [...previousMessagesRaw, value]
      }
    },
  },
});

export const {
  setCurrentConversation,
  initializeMessagesState,
  addMessageToConversation,
} = messagesSlice.actions;

//export selectors
export const selectCurrentMessages = (
  state: RootState
): IReceiveIndividualMessage[] => {
  let key = state.messagesState.currentConversation;
  if (Object.keys(state.messagesState.conversations).includes(key)) {
    return state.messagesState.conversations[key];
  } else {
    return [];
  }
};

export const sendMessage =
  (payload: ISendIndividualMessage): AppThunk =>
  async (dispatch, getState) => {
    const socket = getState().socketState.socket;
    const { message, receiverId } = payload;
    const toPush: IReceiveIndividualMessage = {
      message: message,
      senderId: getState().currentUserState.currentUserId,
      senderName: "Sender",
    };
    if (socket !== null) {
      try {
        await socket.emit(SOCKET_EVENTS.SEND_MESSAGE, payload);
        await dispatch(
          addMessageToConversation({ key: receiverId, value: toPush })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
export const selectCurrentConversation = (state: RootState) =>
  state.messagesState.currentConversation;

export const selectPeoples = (state: RootState) => state.messagesState.peoples;
export default messagesSlice.reducer;
