import { useState } from 'react';
import Base from '../base/Base';
import styles from './home.module.scss';

import Tanagement from './modules/tanagement/Tanagement';
import Meeting from './modules/meeting/Meeting';
import Report from './modules/report/Report';
import TeamTask from './modules/teamTask/TeamTask';
import MyTask from './modules/myTask/MyTask';
import Achievement from './modules/achievement/Achievement';

import { User, setUser } from '../../../store/slices/userSlice';
import { ReportInfo, TeamInfo, TodoInfo, clearAll, createTeam } from '../../../store/slices/teamSlice';
import userEmoji1 from '../../../assets/images/emojis/male1.svg';
import userEmoji2 from '../../../assets/images/emojis/male2.svg';
import userEmoji3 from '../../../assets/images/emojis/female1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

function Home() {
  const [currentTeam, setCurrentTeam] = useState<TeamInfo>();
  const tanagement_log = localStorage.getItem('tanagement');
  const dispatch = useDispatch();
  const me = useSelector((state:RootState) => state.user.user);
  const moment = require('moment');

  const createDummyData = () => {
    const users: Array<User> = [
      new User("이상협", "asd", "asd", userEmoji1),
      new User("나상호", "asd", "asd", userEmoji2),
      new User("김새은", "asd", "asd", userEmoji3)
    ];
    
    const todos: Array<TodoInfo> = [
      new TodoInfo({
        user: users[0],
        title: "PPT 샘플 제작", 
        due: moment('2023-10-01').format(),
        start: moment('2023-09-28').format()
      }),
      new TodoInfo({
        user: me,
        title: "타겟층 조사",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-28').format()
      }),
      new TodoInfo({
        user: users[1],
        title: "로케 선정",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-23').format()
      }),
      new TodoInfo({
        user: me,
        title: "로케 선정",
        due: moment('2023-09-30').format(),
        start: moment('2023-09-23').format()
      }),
      new TodoInfo({
        user: me,
        title: "구도, 모션 레퍼런스",
        due: moment('2023-09-29').format(),
        start: moment('2023-09-23').format(),
        state: true
      }),
      new TodoInfo({
        user: users[2],
        title: "중간 정리",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-29').format()
      }),
      new TodoInfo({
        user: users[2],
        title: "모션 정리",
        due: moment('2023-10-03').format(),
        start: moment('2023-10-01').format()
      }),
      new TodoInfo({
        user: me,
        title: "중간 동료 평가",
        due: moment('2023-10-25').format(),
        start: moment('2023-10-01').format(),
        importance: -1
      }),
    ];
  
    const reports: Array<ReportInfo> = [
      new ReportInfo({
        title: "나이키 광고 발표 자료 제작",
        users: [me, ...users],
        startTime: moment('2023-09-23 16:17:00').format(),
        endTime: moment('2023-09-23 17:38:32').format(),
        keywords: ["이론", "소비자", "흐름파악"],
        memo: [
          [users[1], ["조사 적어도 1-2개 레퍼런스 찾아오기",
            "조사 1개 당 a4 2장 내용으로 가져오기",
            "논문이나 책 찾았으면 카톡방에 공유하기",
            "최종 마감기한에서 최소 3일 전에 완성하기"
          ]],
          [users[2], ["태스크 2-3개 분배"]]
        ],
        todos: todos,
        summary: [
          ["광고 레퍼런스 찾기", ["나이키 찾기", "광고 레퍼런스 찾기"]],
          ["태스크 분배", ["마감 기한에 맞춰 적어도 3일 전에 완성하기", "각자 태스크는 2-3개씩 분배"]]
        ],
        analysis: "팀원 모두가 회의에 적극적으로 참여했습니다. 원활하고 소통이 잘 되는 분위기 속에서 회의가 진행된 것을 알 수 있습니다. 다만 똑같은 내용들이 되풀이되는 상황이 있었으며, 보다 더 효율적인 회의를 위해 확정된 안건에 대해서는 넘어가는 것을 추천합니다.",
        isStart: true,
        isEnd: true
      }),
      new ReportInfo({
        title: "나이키 광고 프로포절",
        users: [me, ...users],
        startTime: moment('2023-09-20').format(),
        endTime: moment('2023-09-20 00:30:04').format(),
        keywords: ["운동", "다큐멘터리", "나이키"]
      }),
      new ReportInfo({
        title: "사업 아이디어 선정",
        users: [me, ...users],
        startTime: moment('2023-09-17').format(),
        endTime: moment('2023-09-20 00:53:22').format(),
        keywords: ["광고", "레퍼런스", "나이키"]
      }),
      new ReportInfo({
        title: "팀 비전 및 방향성 설정",
        users: [me, ...users],
        startTime: moment('2023-09-15').format(),
        endTime: moment('2023-09-15 00:40:25').format(),
        keywords: ["광고", "공동체", "소통"]
      }),
      new ReportInfo({
        title: "자기소개 및 팀명 정하기",
        users: [me, ...users],
        startTime: moment('2023-09-12').format(),
        endTime: moment('2023-09-12 00:23:22').format(),
        keywords: ["좋습니다", "어벤져스"]
      })
    ];
  
    const teams: Array<TeamInfo> = [
      new TeamInfo({
        name: "경 | 오인조",
        users: [me, ...users],
        reports: []}),
      new TeamInfo({
        name: "인 | 어벤져스",
        users: [me, ...users],
        reports: reports}),
      new TeamInfo({
        name: "고 | 광고의 신", 
        users: [me, ...users], 
        reports: []}),
    ]
  
    teams.map((team, i) => {
      dispatch(createTeam(team));
      if (i == 0)
        setCurrentTeam(team);
    });
  }

  return (
    <Base onSelectTeam={(team: TeamInfo) => {setCurrentTeam(team);}}
          onAddTeam={() => {createDummyData();}}>
      {(tanagement_log === null) ? <Tanagement /> : 
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.meeting}>
            <Meeting 
              title="회의 with AI"
              meetings={currentTeam?.reports} />
          </div>
          <div className={styles.report}>
            <Report 
              reports={currentTeam?.reports} />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.teamTask}>
            <TeamTask 
              teamInfo={currentTeam} />
          </div>
          <div className={styles.myTask}>
            <MyTask 
              teamInfo={currentTeam} />
          </div>
          <div className={styles.achievement}>
            <Achievement
              teamInfo={currentTeam} />
          </div>
        </div>
      </div>
      }
    </Base>
  )
}

export default Home;
