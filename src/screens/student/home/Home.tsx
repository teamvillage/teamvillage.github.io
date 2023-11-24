import { useEffect, useLayoutEffect, useState } from 'react';
import Base from '../base/Base';
import styles from './home.module.scss';

import Tanagement from './modules/tanagement/Tanagement';
import Meeting from './modules/meeting/Meeting';
import Report from './modules/report/Report';
import TeamTask from './modules/teamTask/TeamTask';
import MyTask from './modules/myTask/MyTask';
import Achievement from './modules/achievement/Achievement';

import { defaultUsers, User } from '../../../store/slices/userSlice';
import { ReportInfo, TeamInfo, TodoInfo, createTeam } from '../../../store/slices/teamSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AddTeam from './modules/addTeam/AddTeam';
import groupImg from './group_img.png';
import star from './star.png';
import starActive from './star_active.png';

function Home() {
  const [currentTeam, setCurrentTeam] = useState<TeamInfo>();
  const tanagement_log = localStorage.getItem('tanagement');
  const [tanagement, setTanagement] = useState(tanagement_log);
  const dispatch = useDispatch();
  const me = useSelector((state:RootState) => state.user.user);
  const moment = require('moment');
  const teamList = useSelector((state: RootState) => state.team.teamList);

  useLayoutEffect(() => {
    if (teamList.length == 1)
      setCurrentTeam(teamList[0]);    
  }, [teamList])

  const createDummyData = () => {
    const users: Array<User> = defaultUsers.slice(1, 4);
    
    const todos: Array<TodoInfo> = [
      new TodoInfo({
        user: users[0],
        title: "PPT 샘플 제작", 
        due: moment('2023-10-01').format(),
        start: moment('2023-09-28').format(),
        importance: 5
      }),
      new TodoInfo({
        user: me,
        title: "타겟층 조사",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-28').format(),
        importance: 4
      }),
      new TodoInfo({
        user: users[1],
        title: "로케 선정",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-23').format(),
        importance: 3
      }),
      new TodoInfo({
        user: me,
        title: "로케 선정",
        due: moment('2023-09-30').format(),
        start: moment('2023-09-23').format(),
        importance: 5
      }),
      new TodoInfo({
        user: me,
        title: "구도, 모션 레퍼런스",
        due: moment('2023-09-29').format(),
        start: moment('2023-09-23').format(),
        state: true,
        importance: 2
      }),
      new TodoInfo({
        user: users[2],
        title: "중간 정리",
        due: moment('2023-10-01').format(),
        start: moment('2023-09-29').format(),
        importance: 3
      }),
      new TodoInfo({
        user: users[2],
        title: "모션 정리",
        due: moment('2023-10-03').format(),
        start: moment('2023-10-01').format(),
        importance: 4
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
        name: "인 | 어벤져스",
        users: [me, ...users],
        reports: reports}),
      new TeamInfo({
        name: "경 | 오인조",
        users: [me, ...users],
        reports: []}),
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

  const [isReportClicked, setIsReportClicked] = useState(false);
  const content = (
    <div>
      <div className={styles.top}>
        <div className={styles.meeting}>
          <Meeting 
            title="회의 with AI"
            meetings={currentTeam?.reports}
            team={currentTeam} />
        </div>
        <div className={styles.report}>
          <Report 
            onReportClick={() => {
              setIsReportClicked(!isReportClicked);
            }}
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
  )

  const reportModal = () => {
    const flow = [
      [defaultUsers[0], "00:00:05", "안녕하세요. 다 들어오셨으면 회의 시작할게요"],
      [defaultUsers[1], "00:00:15", "네 좋습니다"],
      [defaultUsers[2], "00:01:40", "수업 자료를 보니까 조금 헷갈리는 부분이 있었는데 그럼 저희가 나이키에 대한 자료와 다양한 광고 자료를 보고 그에 대한 프로포절을 작성해서 가는 것이 맞는 건가요?"],
      [defaultUsers[3], "00:02:30", "네 그런걸로 알고 있는데 발표가 2주 뒤입니다"],
      [defaultUsers[2], "00:03:11", "그렇구나 근데 제가 그 주에 공모전이 있어서 발표 자료는 어떻게 만들겠는데 발표를 할 수 있을지는 모르겠습니다"],
      [defaultUsers[1], "00:03:58", "공모전이랑 발표가 상관이 있나요? 정말 궁금해서 여쭤봅니다"],
      [defaultUsers[2], "00:04:10", "공모전 준비 기간이 있는 상황에서 발표를 담당하는게 쉽지 않다는 결론이 나왔습니다"],
      [defaultUsers[0], "00:05:05", "누가 무엇을 얼만큼 할 것인지에 대해서는 뒤에서 차근차근 이야기해보고 각자 자료 조사한거 가볍게 이야기해봐요"],
      [defaultUsers[0], "00:06:05", "없으면 저부터 하겠습니다 광고는 여러모로 일상생활에 긍정적인 영향을 끼칠 뿐만 아니라 많은 생각과 다양한 아이디어를 줄 수 있습니다"],
      [defaultUsers[3], "00:10:30", "저도 수희님이랑 비슷한 생각을 했습니다 광고를 부정적인 시선으로 볼 것만이 아니라는 것을 어필해야할 것 같습니다"],
      [defaultUsers[1], "00:12:03", "저는 반대로 광고의 부정적인 측면들에 대해서 정리했습니다 허위된 사실들을 보는 사람들에게 무분별로 노출이 됩니다 이렇게 하면 그걸 보는 사람들이 객관적인 판단을 하는 데 어려움을 줄 수 있습니다"],
      [defaultUsers[2], "00:15:30", "저도 부정적인 측면들에 대해서 생각을 했습니다 모두에게 소비를 빠르게 그리고 무분별하게 하도로고 독촉을 한다는 점이 있습니다"],
      [defaultUsers[0], "00:17:00", "저는 혹시 몰라서 나이키도 조금 조사했는데 하하"],
      [defaultUsers[1], "00:17:30", "아 그럼 지금 공유해주지 마시고 나중에 필요할 때 말씀해주실 수 있을까요? 수희님꺼 듣고 과제를 임하면 저도 모르게 수희님이 생각하시는 방향으로 따라갈 것 같아서 의견을 내봅니다"],
      [defaultUsers[3], "00:19:20", "음 좋은 것 같아요 더 많은 아이디어를 가지고 오는 걸로 합시다"],
      [defaultUsers[0], "00:20:00", "네 그럼 나이키에 대해서 본격적으로 찾기 전에 광고 쪽 레퍼런스들을 찾아오는 것이 중요할 것 같아요. 아니면 2명 2명 나눠서 나이키와 광고 한팀 씩 맞는 걸로 하겠습니다"],
      [defaultUsers[1], "00:20:50", "좋은 것 같아요 그럼 팀을 어떻게 짜는게 좋을까요?"],
      [defaultUsers[2], "00:25:00", "각자 더 관심있는 분야로 할까요? 저는 광고쪽 리서치가 더 끌리네요"],
      [defaultUsers[3], "00:27:08", "그럼 저는 나이키 할게요! 저랑 나이키 조사하실 분 있나요?"],
      [defaultUsers[0], "00:28:00", "제가 할게요"],
      [defaultUsers[0], "00:28:20", "다음주 월요일 오후 7시까지 해오고 파일 공유하도록 해요"],
      [defaultUsers[1], "00:29:50", "네 감사합니다 다음주에 뵐게요"],
      [defaultUsers[2], "00:30:03", "네 다들 안녕히 가세요"]
    ];

    const tasks = currentTeam?.reports[0].todos ?? [];

    return (
    <div className={styles.reportModal}>
      <img src={groupImg} />
      <div className={styles.flow}>
        {flow.map((item, i) => (
          <div className={styles.item} key={i}>
            <img src={(item[0] as User).emoji} />
            <div className={styles.itemDetail}>
              <div>
                <p>{(item[0] as User).name}</p>
                <p>{item[1] as string}</p>
              </div>
              <p>{item[2] as string}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.taskList}>
        {tasks.map((task, i) => (
          <div className={`${styles.task} ${task.user.isEqual(me) ? styles.myTask : ''}`} key={i}>
            <div className={styles.emoji}>
              <img src={task.user.emoji} />
            </div>
            <p>{task.title}</p>
            <div>
              <img src={task.importance >= 1 ? starActive : star} />
              <img src={task.importance >= 2 ? starActive : star} />
              <img src={task.importance >= 3 ? starActive : star} />
              <img src={task.importance >= 4 ? starActive : star} />
              <img src={task.importance >= 5 ? starActive : star} />
            </div>
            <p>{moment(task.due).format('MM.DD')}</p>
          </div>
        ))}
      </div>
    </div>
  )}

  return (
    <Base onSelectTeam={(team: TeamInfo) => {setCurrentTeam(team);}}
          onAddTeam={() => {createDummyData();}}
          isBackExist={isReportClicked}
          backHandler={() => {setIsReportClicked(false);}}>
      {(tanagement === null) ? 
      <Tanagement onComplete={() => {
        localStorage.setItem('tanagement', 'ok');
        setTanagement('ok');
      }}/> 
      : 
      isReportClicked ? 
      reportModal()
      :
      <div className={styles.container}>
        { teamList.length === 0 ? 
        <AddTeam onComplete={(team: TeamInfo) => {
          dispatch(createTeam(team));
        }}/> 
        : 
        content }
      </div>
      }
    </Base>
  )
}

export default Home;
