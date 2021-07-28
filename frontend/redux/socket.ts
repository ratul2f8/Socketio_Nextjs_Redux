import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { AppThunk, RootState } from "./store";

const SOCKET_URI = "http://localhost:4000";

interface IInitialState {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const initialState: IInitialState = {
  socket: null,
};

export const SOCKET_EVENTS = {
    "CONNECTION": "connection",
    "RECEIVE_MESSAGE": "receive-message",
    "SEND_MESSAGE": "send-message"
}
const socketSlice = createSlice({
  name: "socket-slice",
  initialState,
  reducers: {
    closeSockets: (state): void => {
      if (state.socket) {
        state.socket.close();
      }
    },
    initializeSockets: (state, action: PayloadAction<string>) => {
      //@ts-ignore
      state.socket = io(SOCKET_URI, { query: { id: action.payload } });
    },
  },
});

export const { closeSockets, initializeSockets } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socketState.socket;

export default socketSlice.reducer;
