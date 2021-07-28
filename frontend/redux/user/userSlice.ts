import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitialState {
  currentUserId: string;
}
const initialState: IInitialState = {
  currentUserId: "",
};

const usersSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
    },
    resetUser: (state) => {
      state.currentUserId = "";
    },
  },
});

export const { resetUser, setCurrentUser } = usersSlice.actions;

export const selectCurrentUser = (state: RootState) =>
  state.currentUserState.currentUserId;

export default usersSlice.reducer;
