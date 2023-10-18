import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userSlice";

interface Todo {
  user: User,
  title: string,
  due: string,
  start: string,
  importance?: number,
  state?: boolean
}
export class TodoInfo {
  user: User;
  title: string;
  due: string;
  start: string;
  importance: number;
  state: boolean;

  constructor({
    user, 
    title,
    due,
    start, 
    importance = 1, 
    state = false
  } : Todo = {} as Todo) {
    this.user = user;
    this.title = title;
    this.due = due;
    this.start = start;
    this.importance = importance;
    this.state = state;
  }

  isSame(other?: TodoInfo): boolean {
    return this.title == other?.title &&
           this.user == other.user;
  }
}

interface Report {
  title: string;
  users: Array<User>;
  startTime: string;
  endTime: string;
  keywords?: Array<string>;
  memo?: Array<[User, Array<string>]>;
  todos?: Array<TodoInfo>;
  summary?: Array<[string, Array<string>]>;
  analysis?: string;
  isStart?: boolean;
  isEnd?: boolean;
}
export class ReportInfo {
  startTime: string;
  title: string;
  users: Array<User>;
  endTime: string;
  keywords: Array<string>;
  memo: Array<[User, Array<string>]>;
  todos: Array<TodoInfo>;
  summary: Array<[string, Array<string>]>;
  analysis: string;
  isStart: boolean;
  isEnd: boolean;

  constructor({
    title,
    users,
    startTime,
    endTime,
    keywords = [],
    memo = [],
    todos = [],
    summary = [],
    analysis = '',
    isStart = false,
    isEnd = false
  }: Report = {} as Report) {
    this.startTime = startTime;
    this.title = title;
    this.users = users;
    this.endTime = endTime;
    this.keywords = keywords;
    this.memo = memo;
    this.todos = todos;
    this.summary = summary;
    this.analysis = analysis;
    this.isStart = isStart;
    this.isEnd = isEnd;
  }

  isSame(other?: Report): boolean {
    return this.title == other?.title &&
           this.startTime == other.startTime &&
           this.endTime == other.endTime;
  }
}

interface Team {
  name: string;
  users: Array<User>;
  reports: Array<ReportInfo>;
}
export class TeamInfo {
  name: string;
  users: Array<User>;
  reports: Array<ReportInfo>;

  constructor({name, users, reports}: Team) {
    this.name = name;
    this.users = users;
    this.reports = reports;
  }

  isSame(other?: TeamInfo): boolean {
    return this.name == other?.name;
  }
}

interface ICommonState {
  teamList: Array<TeamInfo>
}

const initialState: ICommonState = {
  teamList: []
}

export const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    createTeam(state: ICommonState, action: PayloadAction<TeamInfo>) {
      if (state.teamList.length < 4) {
        let teams = state.teamList.slice();
        teams.push(action.payload);
        state.teamList = teams;
      }
    },
    addReport(state: ICommonState, action: PayloadAction<[TeamInfo, ReportInfo]>) {
      let idx = state.teamList.findIndex(team => team.isSame(action.payload[0]));
      if (idx > -1) {
        let reports = state.teamList[idx].reports.slice();
        reports.push(action.payload[1]);
        let teams = state.teamList.slice();
        teams[idx].reports = reports;
        state.teamList = teams;
      }
    },
    updateTodo(state: ICommonState, action: PayloadAction<[TeamInfo|undefined, TodoInfo, boolean]>) {
      if (action.payload[0] != undefined) {
        let teamIdx = state.teamList.findIndex(team => team.isSame(action.payload[0]));
        if (teamIdx > -1) {
          let todoIdx = -1;
          state.teamList[teamIdx].reports.some((report, reportIdx) => {
            todoIdx = report.todos.findIndex(todo => todo.isSame(action.payload[1]))
  
            if (todoIdx > -1) {
              let teams = state.teamList.slice();
              teams[teamIdx].reports[reportIdx].todos[todoIdx].state = action.payload[2];
              state.teamList = teams;
              return true;
            }
          })
        }
      }
    },
    startMeeting(state: ICommonState, action: PayloadAction<ReportInfo>) {
      const moment = require('moment');
      let teams = state.teamList;
      teams.some(team => 
        team.reports.some(e => {
          if (e.title == action.payload.title) {
            e.isStart = true;
            e.startTime = moment();
            return true;
          }
        })
      );
      state.teamList = teams;
    },
    endMeeting(state: ICommonState, action: PayloadAction<ReportInfo>) {
      const moment = require('moment');
      let teams = state.teamList;
      teams.some(team => 
        team.reports.some(e => {
          if (e.title == action.payload.title) {
            e.isEnd = true;
            e.endTime = moment();
            return true;
          }
        })
      );
      state.teamList = teams;
    },
    clearAll(state: ICommonState) {
      state.teamList = [];
    }
  }
})

export const { createTeam, addReport, updateTodo, startMeeting, endMeeting, clearAll } = teamSlice.actions;
export default teamSlice;
