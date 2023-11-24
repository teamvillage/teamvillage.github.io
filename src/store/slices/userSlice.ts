import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import m1 from './img/m1.png';
import m2 from './img/m2.png';
import m3 from './img/m3.png';
import m4 from './img/m4.png';
import m5 from './img/m5.png';
import m6 from './img/m6.png';
import m7 from './img/m7.png';
import m8 from './img/m8.png';
import m9 from './img/m9.png';
import m10 from './img/m10.png';
import m11 from './img/m11.png';
import m12 from './img/m12.png';
import m13 from './img/m13.png';
import m14 from './img/m14.png';
import m15 from './img/m15.png';
import m16 from './img/m16.png';
import m17 from './img/m17.png';
import m18 from './img/m18.png';
import m19 from './img/m19.png';
import m20 from './img/m20.png';
import m21 from './img/m21.png';
import m22 from './img/m22.png';
import m23 from './img/m23.png';
import m24 from './img/m24.png';
import prof from './img/prof.png';

export class User {
  name?: string;
  id?: string;
  pw?: string;
  emoji?: string;
  department?: string;
  number?: number;
  team?: string;
  lastEnter?: string;
  male?: boolean;
  strong?: string;
  weak?: string;
  
  constructor(params: Partial<User>) {
    Object.assign(this, params);
  }

  isEqual(other: User): boolean {
    return other.name == this.name;
  }
}

interface ICommonState {
  user: User
}

const initialState: ICommonState = {
  user: new User({})
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

export const defaultProf = new User({
  name: 'Prof',
  emoji: prof
})

export const defaultUsers = [
  new User({
    name: '고수희',
    emoji: m1,
    department: '경영학',
    number: 21900456,
    team: '어벤져스팀',
    lastEnter: '5시간 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '김새은',
    emoji: m2,
    department: '커뮤니케이션',
    number: 22300453,
    team: '어벤져스팀',
    lastEnter: '40분 전',
    male: false,
    strong: '추진',
    weak: '완성'
  }),
  new User({
    name: '나영호',
    emoji: m4,
    department: '커뮤니케이션',
    number: 21600234,
    team: '끝내주조팀',
    lastEnter: '일주일 전',
    male: true,
    strong: '추진',
    weak: '소통'
  }),
  new User({
    name: '이상협',
    emoji: m3,
    department: '시각디자인',
    number: 22100235,
    team: '어벤져스팀',
    lastEnter: '1시간 전',
    male: true,
    strong: '완성',
    weak: '소통'
  }),
  new User({
    name: '이상협',
    emoji: m5,
    department: '무역',
    number: 21700523,
    team: '어벤져스팀',
    lastEnter: '30분 전',
    male: true,
    strong: '추진',
    weak: '완성'
  }),
  new User({
    name: '이수현',
    emoji: m6,
    department: '커뮤니케이션',
    number: 22200482,
    team: '끝내주조팀',
    lastEnter: '35분 전',
    male: false,
    strong: '소통',
    weak: '리더십'
  }),
  new User({
    name: '윤수정',
    emoji: m7,
    department: '국어국문',
    number: 21900382,
    team: '오리무중팀',
    lastEnter: '1분 전',
    male: false,
    strong: '완성',
    weak: '추진'
  }),
  new User({
    name: '정윤수',
    emoji: m8,
    department: '시각디자인',
    number: 22100892,
    team: '오리무중팀',
    lastEnter: '3일 전',
    male: true,
    strong: '리더십',
    weak: '소통'
  }),
  new User({
    name: '최경헌',
    emoji: m9,
    department: '경영학',
    number: 21800321,
    team: '오리무중팀',
    lastEnter: '2시간 전',
    male: true,
    strong: '추진',
    weak: '완성'
  }),
  new User({
    name: '황재현',
    emoji: m10,
    department: '경영학',
    number: 22000342,
    team: '오리무중팀',
    lastEnter: '2일 전',
    male: true,
    strong: '리더십',
    weak: '추진'
  }),
  new User({
    name: '이수현',
    emoji: m11,
    department: '경영학',
    number: 22000342,
    team: '끝내주조팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '김재호',
    emoji: m12,
    department: '경영학',
    number: 22000342,
    team: '끝내주조팀',
    lastEnter: '2일 전',
    male: true,
    strong: '완성', 
    weak: '소통'
  }),
  new User({
    name: '윤정아',
    emoji: m13,
    department: '경영학',
    number: 22000342,
    team: '산중호걸팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '최정선',
    emoji: m14,
    department: '경영학',
    number: 22000342,
    team: '산중호걸팀',
    lastEnter: '2일 전',
    male: true,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '강희진',
    emoji: m15,
    department: '경영학',
    number: 22000342,
    team: '산중호걸팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '최유나',
    emoji: m16,
    department: '경영학',
    number: 22000342,
    team: '산중호걸팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '최유진',
    emoji: m17,
    department: '경영학',
    number: 22000342,
    team: '아자아자팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '김현모',
    emoji: m18,
    department: '경영학',
    number: 22000342,
    team: '아자아자팀',
    lastEnter: '2일 전',
    male: true,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '조예림',
    emoji: m19,
    department: '경영학',
    number: 22000342,
    team: '아자아자팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '박상진',
    emoji: m20,
    department: '경영학',
    number: 22000342,
    team: '아자아자팀',
    lastEnter: '2일 전',
    male: true,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '윤슬기',
    emoji: m21,
    department: '경영학',
    number: 22000342,
    team: '불꽃놀이팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '최명호',
    emoji: m22,
    department: '경영학',
    number: 22000342,
    team: '불꽃놀이팀',
    lastEnter: '2일 전',
    male: true,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '황정선',
    emoji: m23,
    department: '경영학',
    number: 22000342,
    team: '불꽃놀이팀',
    lastEnter: '2일 전',
    male: true,
    strong: '소통',
    weak: '추진'
  }),
  new User({
    name: '이세하',
    emoji: m24,
    department: '경영학',
    number: 22000342,
    team: '불꽃놀이팀',
    lastEnter: '2일 전',
    male: false,
    strong: '소통',
    weak: '추진'
  })
]