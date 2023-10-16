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
      state.teamList.push(action.payload);
    },
    addReport(state: ICommonState, action: PayloadAction<[TeamInfo, ReportInfo]>) {
      let team = state.teamList.find(team => team.name === action.payload[0].name);
      team?.reports.push(action.payload[1]);
    },
    updateTodo(state: ICommonState, action: PayloadAction<[TeamInfo, TodoInfo, boolean]>) {
      let team = state.teamList.find(team => team.name === action.payload[0].name);
      console.log(team);
      team?.reports.forEach(report => {
        let todo = report.todos?.find(todo => todo.title === action.payload[1].title);
        if (todo)
          todo.state = action.payload[2];
      });
    },
    startMeeting(state: ICommonState, action: PayloadAction<ReportInfo>) {
      const moment = require('moment');
      state.teamList.some(team => 
        team.reports.some(e => {
          if (e.title == action.payload.title) {
            e.isStart = true;
            e.startTime = moment();
            return true;
          }
        })
      );
    },
    endMeeting(state: ICommonState, action: PayloadAction<ReportInfo>) {
      const moment = require('moment');
      state.teamList.some(team => 
        team.reports.some(e => {
          if (e.title == action.payload.title) {
            e.isEnd = true;
            e.endTime = moment();
            return true;
          }
        })
      );
    },
    clearAll(state: ICommonState) {
      state.teamList = [];
    }
  }
})

export const { createTeam, addReport, updateTodo, startMeeting, endMeeting, clearAll } = teamSlice.actions;
export default teamSlice;
