import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import teamSlice from './slices/teamSlice';
import classSlice from './slices/classSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    team: teamSlice.reducer,
    class: classSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;