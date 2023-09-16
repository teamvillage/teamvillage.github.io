import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import teamSlice from './slices/teamSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    team: teamSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;