import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// for Dummy
import emoji from '../../assets/images/emojis/female1.svg';

export interface IUserInfo {
  name: string;
  id: string;
  pw: string;
  emoji: string;
}

export interface ICommonState {
  info: IUserInfo
}

const initialState: ICommonState = {
  // info: []

  // Dummy Data
  info: { name: "고수희", id: "asd", pw: "123", emoji: emoji }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserInfo>) {
      state.info = action.payload;
    }
  }
})

export const { setUser } = userSlice.actions;

export default userSlice;