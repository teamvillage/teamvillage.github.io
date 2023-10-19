import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userSlice";

export class TeamInfo {
  name?: string;
  users?: Array<User>;
  strong?: string;
  weak?: string;

  constructor(params: Partial<TeamInfo>) {
    Object.assign(this, params);
  }

  isEqual(other: TeamInfo): boolean {
    return other.name == this.name;
  }
}

export class ClassInfo {
  name?: string;
  code?: string;
  number?: number;
  teams?: Array<TeamInfo>;
  students?: Array<User>;

  constructor(params: Partial<ClassInfo>) {
    Object.assign(this, params);
  }

  isEqual(other: ClassInfo): boolean {
    return other.name == this.name &&
           other.number == this.number;
  }
}

interface ICommonState {
  classList: Array<ClassInfo>
}

const initialState: ICommonState = {
  classList: []
}

export const classSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    createClass(state: ICommonState, action: PayloadAction<ClassInfo>) {
      if (state.classList.length < 4) {
        let classes = state.classList.slice();
        classes.push(action.payload);
        state.classList = classes;
      }
    },
    clearAll(state: ICommonState) {
      state.classList = [];
    }
  }
})

export const { createClass, clearAll } = classSlice.actions;
export default classSlice;
