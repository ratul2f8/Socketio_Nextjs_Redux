import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; 
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import counterSlice from './counter/counterSlice';
import messageSlice from './messages/messageSlice';
import userSlice from "./user/userSlice";
import socketSlice from "./socket";

const reducers = combineReducers({
  counterState: counterSlice,
  currentUserState: userSlice,
  messagesState: messageSlice,
  socketState: socketSlice
})
const persistConfig = {
  key : "root",
  storage: storage,
  whitelist: ["counterState", "currentUserState", "messagesState"]
}
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
    serializableCheck: false
  })
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
