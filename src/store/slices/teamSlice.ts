import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "./userSlice";

import emoji1 from '../../assets/images/emojis/male1.svg';
import emoji2 from '../../assets/images/emojis/male2.svg';
import emoji3 from '../../assets/images/emojis/female1.svg';
import emoji4 from '../../assets/images/emojis/female2.svg';

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

let users: Array<IUserInfo> = [
  {
    name: "이상협",
    id: "asd",
    pw: "asd",
    emoji: emoji1
  },
  {
    name: "나상호",
    id: "asd", 
    pw: "asd", 
    emoji: emoji2
  },
  {
    name: "김새은",
    id: "asd", 
    pw: "asd", 
    emoji: emoji3
  },
  {
    name: "고수희", 
    id: "asd", 
    pw: "123",
    emoji: emoji4
  }
];

const moment = require('moment');
let reports: Array<IReportInfo> = [
  {
    title: "나이키 광고 발표 자료 제작",
    startTime: moment('2023-09-23 16:17:00').format(),
    endTime: moment('2023-09-23 17:38:32').format(),
    keywords: ["이론", "소비자", "흐름파악"],
    memo: users.filter((_, idx) => idx !== 1).map((user, idx) => {
      let list: Array<string> = [];
      switch (idx) {
      case 0:
      case 1:
        list = ["조사 적어도 1-2개 레퍼런스 찾아오기",
        "조사 1개 당 a4 2장 내용으로 가져오기",
        "논문이나 책 찾았으면 카톡방에 공유하기",
        "최종 마감기한에서 최소 3일 전에 완성하기"];
        break;
      case 2:
        list = ["태스크 2-3개 분배"];
        break;
      }
      return [user, list];
    }),
    todos: [
      {
        user: users[1],
        title: "PPT 샘플 제작",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-28').format(),
        importance: 5,
        state: false
      },
      {
        user: users[3],
        title: "타겟층 조사",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-28').format(),
        importance: 5,
        state: false
      },
      {
        user: users[0],
        title: "로케 선정",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-23').format(),
        importance: 5,
        state: false
      },
      {
        user: users[3],
        title: "로케 선정",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-23').format(),
        importance: 4,
        state: false
      },
      {
        user: users[3],
        title: "구도, 모션 레퍼런스",
        due: moment('2023-09-29').format(),
        start: moment('2023-09-23').format(),
        importance: 2,
        state: false
      },
      {
        user: users[2],
        title: "중간 정리",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-29').format(),
        importance: 3,
        state: false
      },
      {
        user: users[2],
        title: "모션 정리",
        due: moment('2023-10-03').format(),
        start: moment('2023-10-01').format(),
        importance: 1,
        state: false
      }
    ],
    summary: [["광고 레퍼런스 찾기", ["나이키 찾기", "광고 레퍼런스 찾기"]], ["태스크 분배", ["마감 기한에 맞춰 적어도 3일 전에 완성하기", "각자 태스크는 2-3개씩 분배"]]],
    analysis: "팀원 모두가 회의에 적극적으로 참여했습니다. 원활하고 소통이 잘 되는 분위기 속에서 회의가 진행된 것을 알 수 있습니다. 다만 똑같은 내용들이 되풀이되는 상황이 있었으며, 보다 더 효율적인 회의를 위해 확정된 안건에 대해서는 넘어가는 것을 추천합니다."
  },
  {
    title: "나이키 광고 프로포절",
    startTime: moment('2023-09-20').format(),
    endTime: moment('2023-09-20 00:30:04').format(),
    keywords: ["운동", "다큐멘터리", "나이키"],
    memo: [],
    todos: [],
    summary: [],
    analysis: ""
  },
  {
    title: "사업 아이디어 선정",
    startTime: moment('2023-09-17').format(),
    endTime: moment('2023-09-20 00:53:22').format(),
    keywords: ["광고", "레퍼런스", "나이키"],
    memo: [],
    todos: [],
    summary: [],
    analysis: ""
  },
  {
    title: "팀 비전 및 방향성 설정",
    startTime: moment('2023-09-15').format(),
    endTime: moment('2023-09-15 00:40:25').format(),
    keywords: ["광고", "공동체", "소통"],
    memo: [],
    todos: [],
    summary: [],
    analysis: ""
  },
  {
    title: "자기소개 및 팀명 정하기",
    startTime: moment('2023-09-12').format(),
    endTime: moment('2023-09-12 00:23:22').format(),
    keywords: ["좋습니다", "어벤져스"],
    memo: [],
    todos: [],
    summary: [],
    analysis: ""
  }
];

let teams: Array<ITeamInfo> = [
  {
    name: "경 | 오인조",
    users: users,
    reports: []
  },
  {
    name: "인 | 어벤져스",
    users: users,
    reports: reports
  },
  {
    name: "고 | 광고의 신",
    users: users,
    reports: []
  }
];

const initialState: ICommonState = {
  teamList: teams
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
    clearAll(state) {
      state.teamList = [];
    }
  }
})

export const { createTeam, addReport, updateTodo, clearAll } = teamSlice.actions;

export default teamSlice;