import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "./userSlice";

export interface ITodoInfo {
  user: IUserInfo;
  title: string;
  due: string;
  start: string;
  importance: number;
  state: boolean;
}

export interface IReportInfo {
  startTime: string;
  title: string;
  endTime?: string;
  keywords?: Array<string>;
  memo?: Array<[IUserInfo, Array<string>]>;
  todos?: Array<ITodoInfo>;
  summary?: Array<[string, Array<string>]>;
  analysis?: string;
}

export interface ITeamInfo {
  name: string;
  users: Array<IUserInfo>;
  reports: Array<IReportInfo>;
}

export interface ICommonState {
  teamList: Array<ITeamInfo>
}

const initialState: ICommonState = {
  teamList: []
}

export const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    createTeam(state, action: PayloadAction<ITeamInfo>) {
      state.teamList.push(action.payload);
    },
    addReport(state, action: PayloadAction<[string, IReportInfo]>) {
      let team = state.teamList.find(team => team.name === action.payload[0]);
      team?.reports.push(action.payload[1]);
    },
    updateTodo(state, action: PayloadAction<[string, string, boolean]>) {
      let team = state.teamList.find(team => team.name === action.payload[0]);
      team?.reports.forEach(report => {
        let todo = report.todos?.find(todo => todo.title === action.payload[1]);
        if (todo)
          todo.state = action.payload[2];
      });
    },
    /*************** FOR DEBUG ONLY *******************/
    clearAll(state, _) {
      state.teamList = [];
    }
  }
})

export const { createTeam, addReport, updateTodo, clearAll } = teamSlice.actions;

export default teamSlice;