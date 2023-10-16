import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export class User {
  name: string;
  id: string;
  pw: string;
  emoji: string;

  constructor(name: string, id: string, pw: string, emoji: string) {
    this.name = name;
    this.id = id;
    this.pw = pw;
    this.emoji = emoji;
  }

  isEqual(other: User): boolean {
    return other.name == this.name;
  }
}

interface ICommonState {
  user: User
}

const initialState: ICommonState = {
  user: new User('', '', '', '')
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state: ICommonState, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
})

export const { setUser } = userSlice.actions;

export default userSlice;

