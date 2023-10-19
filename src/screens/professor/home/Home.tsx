import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components';
import { RootState } from '../../../store';
import { ClassInfo, createClass, TeamInfo } from '../../../store/slices/classSlice';
import { defaultUsers, User } from '../../../store/slices/userSlice';
import Base from '../base/Base';
import styles from './home.module.scss';
import AddClass from './modules/addClass/AddClass';

function Home() {
  const [currentClass, setCurrentClass] = useState<ClassInfo|null>(null);
  const [selectedDiv, setSelectedDiv] = useState(1);
  const classList = useSelector((state: RootState) => state.class.classList);
  const dispatch = useDispatch();

  function createDummyData() {
    let teamNames: Array<string> = [];
    defaultUsers.map(user => {if (user.team) teamNames.push(user.team);});
    teamNames = teamNames.filter((team, i) => teamNames.indexOf(team) === i);
    let strongs = ['분석적', '활발한', '공감능력', '신중한', '분석적', '상상력'];
    let weaks = ['소통', '산만한', '분석적', '공감능력', '동기부여', '계획적'];
    
    let teams: Array<TeamInfo> = [];
    teamNames.map((tname, i) => {
      const newTeam = new TeamInfo({
        name: tname,
        users: [],
        strong: strongs[i],
        weak: weaks[i]
      });
      teams.push(newTeam);
    });

    defaultUsers.map(user => {
      let team = teams.find(t => t.name == user.team);
      if (team)
        team.users!.push(user);
    });

    const classes: Array<ClassInfo> = [
      new ClassInfo({
        name: '광고와 사회',
        number: 1,
        teams: teams,
        students: defaultUsers,
        code: 'COM20034'
      }),
      new ClassInfo({
        name: '광고 제작실습',
        number: 1,
        code: 'COM20038'
      }),
      new ClassInfo({
        name: '저널리즘의 이해',
        number: 1,
        code: 'COM20022'
      }),
      new ClassInfo({
        name: '저널리즘의 이해',
        number: 2,
        code: 'COM20022'
      }),
    ];

    classes.map(cls => dispatch(createClass(cls)));
  }

  useEffect(() => {
    if (!currentClass)
      setCurrentClass(classList[0])
  }, [classList]);

  return (
    <Base onSelectClass={(cls: ClassInfo) => {setCurrentClass(cls)}}
          onAddClass={() => {createDummyData();}}>
      <div className={styles.container}>
        { classList.length === 0 ? 
        <AddClass onComplete={(cls: ClassInfo) => {
          // dispatch(createClass(cls));
          createDummyData();
        }}/> 
        : 
        <div className={styles.content}>
          <div className={`${styles.notice} ${styles.block}`}>
            <div className={styles.header}>
              <p>공지</p>
              <p>더보기 &gt;</p>
            </div>
            <div className={styles.bottom}>
              <Button className={styles.startBtn}>
                <p>시작하기</p>
              </Button>
            </div>
          </div>
          <div className={`${styles.assignment} ${styles.block}`}>
            <div className={styles.header}>
              <p>과제</p>
              <p>더보기 &gt;</p>
            </div>
            <div className={styles.bottom}>
              <Button className={styles.startBtn}>
                <p>시작하기</p>
              </Button>
            </div>
          </div>
          {currentClass?.teams ?
          <div className={`${styles.students} ${styles.block}`}>
            <div className={styles.top}>
              <div className={styles.control}>
                <div className={selectedDiv == 1 ? styles.active : ''} 
                     onClick={() => setSelectedDiv(1)}>
                  <p>학생 개별관리 <span>{currentClass.students?.length}</span></p>
                </div>
                <div className={selectedDiv == 2 ? styles.active : ''} 
                     onClick={() => setSelectedDiv(2)}>
                  <p>팀 관리 <span>{currentClass.teams?.length}</span></p>
                </div>
              </div>
              <div className={styles.etc}>
              </div>
            </div>
            <div className={styles.studentInfo}>
              <table>
                <thead>
                  {selectedDiv == 1 &&
                  <tr className={styles.studentControl}>
                    <th>&nbsp;</th>
                    <th><p>학생 이름</p></th>
                    <th><p>학과</p></th>
                    <th><p>학번</p></th>
                    <th><p>팀</p></th>
                    <th><p>평가</p></th>
                    <th><p>최근접속기록</p></th>
                    <th><p>상세</p></th>
                  </tr>
                  }
                  {selectedDiv == 2 &&
                  <tr className={styles.teamControl}>
                    <th><p>팀 이름</p></th>
                    <th><p>팀원</p></th>
                    <th><p>총원</p></th>
                    <th><p>팀 성적</p></th>
                    <th><p>팀 강점</p></th>
                    <th><p>팀 약점</p></th>
                    <th><p>상세</p></th>
                  </tr>
                  }
                </thead>
                  {selectedDiv == 1 &&
                  <tbody className={styles.studentControl}>
                    {currentClass.students?.map((user, i) => (
                      <tr key={i}>
                        <td>
                          <div className={styles.emojiWrapper}>
                            <img src={user.emoji} alt='emoji' />
                          </div>
                        </td>
                        <td><p>{user.name}</p></td>
                        <td><p>{user.department}</p></td>
                        <td><p>{user.number}</p></td>
                        <td>
                          <div className={`${styles['color' + currentClass.teams?.findIndex(e => {
                            if (e.name == user.team)
                              return true;
                          })]} ${styles.teamname}`}>
                            <p>{user.team}</p>
                          </div>
                        </td>
                        <td><p>-</p></td>
                        <td><p>{user.lastEnter}</p></td>
                        <td><div><p>상세</p></div></td>
                      </tr>
                    ))
                    }
                  </tbody>
                  }
                  {selectedDiv == 2 &&
                  <tbody className={styles.teamControl}>
                    {currentClass.teams?.map((team, i) => (
                      <tr key={i}>
                        <td>
                          <div className={`${styles['color' + currentClass.teams?.indexOf(team)]} ${styles.teamname}`}>
                            <p>{team.name}</p>
                          </div>
                        </td>
                        <td>
                          <div>
                            {team.users?.map((user, j) => 
                              <div className={styles.emojiWrapper}>
                                <img key={j} src={user.emoji} />
                              </div>)}
                          </div>
                        </td>
                        <td><p>{team.users?.length}</p></td>
                        <td><p>-</p></td>
                        <td><p>{team.strong}</p></td>
                        <td><p>{team.weak}</p></td>
                        <td><div><p>상세</p></div></td>
                      </tr>
                    ))
                    }
                  </tbody>
                  }
              </table>
            </div>
          </div>
          :
          <></>
          }
        </div>
        }
      </div>
    </Base>
  )
}

export default Home;
