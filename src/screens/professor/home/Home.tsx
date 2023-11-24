import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components';
import { RootState } from '../../../store';
import { ClassInfo, createClass, TeamInfo } from '../../../store/slices/classSlice';
import { defaultUsers, User } from '../../../store/slices/userSlice';
import Base from '../base/Base';
import styles from './home.module.scss';
import AddClass from './modules/addClass/AddClass';

import logoIcon from './logo_icon.png';
import aiIcon from './ai_icon.png';
import aiIconActive from './ai_icon_active.png';
import hatIcon from './hat_icon.png';
import tieIcon from './tie_icon.png';
import step1Img from './step1_img.png';
import step2Img from './step2_img.png';
import step3Img from './step3_img.png';
import groupImg from './groupImg.png';
import teamDetailImg from './team_detail_img.png';
import personDetailImg from './personDetail.png';
import assignPopup1 from './assign_popup1.png';
import assignPopup2 from './assign_popup2.png';
import assignPopup3 from './assign_popup3.png';
import assignPopup4 from './assign_popup4.png';
import assignPopup5 from './assign_popup5.png';
import logo_mini from './logo_mini.png';
import logo_full from './logo_full.png';
import { assetType, loadAsset } from '../../../utils/AssetController';

function Home() {
  const [currentClass, setCurrentClass] = useState<ClassInfo|null>(null);
  const [selectedDiv, setSelectedDiv] = useState(1);
  const classList = useSelector((state: RootState) => state.class.classList);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [teamCount, setTeamCount] = useState(6);
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

  const introduction = (
    <div className={`${styles.createTeam} ${styles.block}`}>
      <div className={styles.top}>
        <img src={logoIcon} alt='logo' />
        <p>해당 과목 학생들의 팀을 생성해주세요.</p>
        <p>과목 생성으로 팀 관리에 더욱 최적화된 팀빌리지를 이용해보세요!</p>
      </div>
      <div className={styles.bottom}>
        <Button className={styles.item} onClick={() => {setIsClicked(!isClicked);}}>
          <img src={isClicked ? aiIconActive : aiIcon} alt='ai' />
          <div>
            <p className={isClicked ? styles.active : ''}>AI 추천 팀생성</p>
          </div>
        </Button>
        <Button className={styles.item}>
          <img src={tieIcon} alt='ai' />
          <div>
            <p>교수자 설정 팀생성</p>
          </div>
        </Button>
        <Button className={styles.item}>
          <img src={hatIcon} alt='ai' />
          <div>
            <p>학생 스스로 팀생성</p>
          </div>
        </Button>
      </div>
      <Button className={styles.btn} onClick={() => {nextPage();}}>
        <p>생성하기</p>
      </Button>
    </div>
  );

  const step1 = (
    <div className={`${styles.step1} ${styles.step} ${styles.block}`}>
      <div className={styles.top}>
        <p>팀 기준 설정</p>
        <img src={step1Img} alt='step1' />
      </div>
      <div className={styles.bottom}>
        <div className={styles.setting}>
          <p>팀 기본 세팅</p>
        </div>
        <div className={styles.teamCount}>
          <p>팀 갯수</p>
          <div>
            <Button onClick={() => {setTeamCount(teamCount - 1);}}>
              <p>-</p>
            </Button>
            <p>{teamCount}</p>
            <Button onClick={() => {setTeamCount(teamCount + 1);}}>
              <p>+</p>
            </Button>
          </div>
        </div>
        <div className={styles.memberCount}>
          <p>팀당 팀워 수</p>
          <p>4명</p>
        </div>
        <p className={styles.info}>학생의 강/약점 및 태니지먼트 결과는 자동 반영 됩니다.</p>
      </div>
      <div className={styles.btns}>
        <Button onClick={() => nextPage(true)}>
          <p>이전</p>
        </Button>
        <Button onClick={() => {
          setTimeout(() => {
            setCurrentPage(currentPage + 2);
          }, 1000);
          nextPage();
        }}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  );

  const [homeIcon, setHomeIcon] = useState('');
  useEffect(() => {
    loadAsset('home_icon.png', assetType.image)
      .then(image => setHomeIcon(image.default));
  }, []);
  const analyzing = (
    <div className={`${styles.analyzing} ${styles.step} ${styles.block}`}>
      <div className={styles.icons}>
        <img src={homeIcon} alt='homeIcon' />
        <img src={homeIcon} alt='homeIcon' />
        <img src={homeIcon} alt='homeIcon' />
        <img src={homeIcon} alt='homeIcon' />
        <img src={homeIcon} alt='homeIcon' />
      </div>
      <div className={styles.info}>
        <p>응답하신 내용을 토대로 결과를 분석중입니다.</p>
      </div>
    </div>
  )

  const teams = [] as Array<Array<User>>;
  for (let i = 0; i < defaultUsers.length / 4; i++)
    teams.push(defaultUsers.slice(i * 4, i * 4 + 4));
  const step2 = (
    <div className={`${styles.step2} ${styles.step} ${styles.block}`}>
      <div className={styles.shadow}></div>
      <div className={styles.top}>
        <p>AI가 학생 강점 기반으로 구성한 팀포메이션입니다.</p>
        <img src={step2Img} alt='step1' />
      </div>
      <div className={styles.bottom}>
        {teams.map((users, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.title}>
              <p>{String.fromCharCode(idx + 'A'.charCodeAt(0))}팀</p>
              <div><p>4명</p></div>
            </div>
            <div className={styles.people}>
              {users.map((user, i) => (
                <div className={styles.user} key={i}>
                  <div className={styles.userEmoji}>
                    <img src={user.emoji} />
                  </div>
                  <div className={styles.allInfo}>
                    <div>
                      <p>{user.name}</p>
                      <div className={`${styles.strong} ${styles.pac}`}>
                        <div><p>강</p></div>
                        <p>{user.strong}</p>
                      </div>
                      <div className={`${styles.weak} ${styles.pac}`}>
                        <div><p>약</p></div>
                        <p>{user.weak}</p>
                      </div>
                    </div>
                    <div>
                      <p>{Math.floor((user.number ?? 0) / 100000) % 100}학번 | {user.department} | {user.male ? "남" : "여"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.tpac}>
              <div className={`${styles.strong} ${styles.pac}`}>
                <p>팀 강점</p>
                <div><p>{idx % 3 == 0 ? "의사소통" : idx % 3 == 1 ? "조화로운 역량분배" : "명확한 리더십"}</p></div>
                <div><p>{idx % 3 == 0 ? "열정적인 분위기" : idx % 3 == 1 ? "상호보완 가능" : "화기애애한 분위기"}</p></div>
              </div>
              <div className={`${styles.weak} ${styles.pac}`}>
                <p>팀 약점</p>
                <div><p>{idx % 3 == 0 ? "학번 차이" : idx % 3 == 1 ? "학번 낮은 리더" : "우유부단할 수 있음"}</p></div>
                <div><p>{idx % 3 == 0 ? "명확한 리더의 부재" : idx % 3 == 1 ? "남녀 성비" : "낮은 추진력"}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <Button onClick={() => {
          setCurrentPage(currentPage - 2);
        }}>
          <p>이전</p>
        </Button>
        <Button onClick={() => nextPage()}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const step3 = (
    <div className={`${styles.step3} ${styles.step} ${styles.block}`}>
      <div className={styles.top}>
        <p>AI가 학생 강점 기반으로 구성한 팀포메이션입니다.</p>
        <img src={step3Img} alt='step3' />
      </div>
      <div className={styles.bottom}>
        <img src={groupImg} />
      </div>
      <div className={styles.btn}>
        <Button onClick={() => nextPage()}>
          <p>확정하기</p>
        </Button>
      </div>
    </div>
  )
  
  const nextPage = (isPrev: boolean = false) => {
    if (isPrev)
      setCurrentPage(currentPage - 1);
    else {
      if (currentPage == createTeamPages.length - 1) {
        setCurrentClass(classList[0]);
        setCurrentPage(0);
        setIsClicked(false);
      }
      else
        setCurrentPage(currentPage + 1);
    }
  }
  const createTeamPages = [
    introduction,
    step1,
    analyzing,
    step2,
    step3
  ];

  const [isDetail, setIsDetail] = useState(false);
  const detailModal = (
    <div className={styles.modal}>
      <Button onClick={() => setIsDetail(false)} className={`${styles.detail} ${selectedDiv == 1 ? styles.person : ''}`}>
        <img src={selectedDiv == 1 ? personDetailImg : teamDetailImg} />
      </Button>
    </div>
  )

  const [isAssignment, setIsAssignment] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);
  const [isAssignmentExist, setIsAssignmentExist] = useState(false);
  const [isDataExist, setIsDataExist] = useState(false);
  const data = [
    [logo_mini, '동료평가 제출이 저조한 상황', '10.02'],
    [logo_mini, '중간발표 공지', '10.01'],
    [logo_full, '다들 잘하고 있나 소식이 없', '09.30'],
    [logo_full, '1주차 수업은 온라인으로 하', '09.30'],
    [logo_mini, '타겟층 조사', '10.02'],
    [logo_mini, '로케 선정', '10.01'],
    [logo_full, '타겟층 조사', '09.30'],
    [logo_full, '로케 선정', '09.30']
  ];

  const assignmentModal = () => {
    const imgs = [
      assignPopup1,
      assignPopup2,
      assignPopup3,
      assignPopup4,
      assignPopup5
    ]

    return (
      <div className={`${styles.modal}`}>
        <div className={styles.assignment}>
          <img src={imgs[popupIndex]} />
          <Button 
            className={styles.closeBtn}
            effectOff={true}
            onClick={() => {
              setIsAssignment(false);
              setPopupIndex(0);
            }}>
            <div></div>
          </Button>
          <Button 
            className={styles.prevBtn}
            effectOff={true}
            onClick={() => {
              if (popupIndex == 0)
                setIsAssignment(false);
              else
                setPopupIndex(popupIndex - 1);
            }}>
            <div></div>
          </Button>
          <Button 
            className={`${styles.nextBtn} ${popupIndex < 2 ? styles.fullBtn : ''}`} 
            effectOff={true}
            onClick={() => {
              if (popupIndex == 4) {
                setIsAssignment(false);
                setIsAssignmentExist(true);
                setPopupIndex(0);
              }
              else {
                setPopupIndex(popupIndex + 1);
              }
            }}>
            <div></div>
          </Button>
          {popupIndex == 0 &&
          <Button
            className={styles.checkBtn}
            effectOff={true}
            onClick={() => {
              setPopupIndex(popupIndex + 1);
            }}>
            <div></div>
          </Button>}
        </div>
      </div>
    )
  }

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
              <Button onClick={() => setIsDataExist(!isDataExist)}>
                <p>더보기 &gt;</p>
              </Button>
            </div>
            <div className={styles.addonContent}>
              <Button className={styles.startBtn}>
                <p>시작하기</p>
              </Button>
              {
                isDataExist && 
                <div className={styles.assignments}>
                  {data.slice(0, 3).map(e => (
                    <div className={styles.assignment}>
                      <img src={e[0]} />
                      <p>{e[1]}</p>
                      <p>{e[2]}</p>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
          <div className={`${styles.assignment} ${styles.block}`}>
            <div className={styles.header}>
              <p>과제</p>
              <Button onClick={() => setIsDataExist(!isDataExist)}>
                <p>더보기 &gt;</p>
              </Button>
            </div>
            <div className={styles.addonContent}>
              <Button className={styles.startBtn} onClick={() => setIsAssignment(true)}>
                <p>시작하기</p>
              </Button>
              {
                isAssignmentExist && 
                <div className={styles.assignments}>
                  <div className={styles.assignment}>
                    <img src={logo_mini} />
                    <p>1차 동료평가</p>
                    <p>10.01</p>
                  </div>
                </div>
              }
              {
                isDataExist && 
                <div className={styles.assignments}>
                  {data.slice(4).map(e => (
                    <div className={styles.assignment}>
                      <img src={e[0]} />
                      <p>{e[1]}</p>
                      <p>{e[2]}</p>
                    </div>
                  ))}
                </div>
              }
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
                        <td>
                          <Button onClick={() => setIsDetail(true)}>
                            <p>상세</p>
                          </Button>
                        </td>
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
                              <div key={j} className={styles.emojiWrapper}>
                                <img key={j} src={user.emoji} />
                              </div>)}
                          </div>
                        </td>
                        <td><p>{team.users?.length}</p></td>
                        <td><p>-</p></td>
                        <td><p>{team.strong}</p></td>
                        <td><p>{team.weak}</p></td>
                        <td>
                          <Button onClick={() => setIsDetail(true)}>
                            <p>상세</p>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  }
              </table>
            </div>
          </div>
          :
          createTeamPages[currentPage]
          }
        </div>
        }
      </div>
      {isDetail && detailModal}
      {isAssignment && assignmentModal()}
    </Base>
  )
}

export default Home;
