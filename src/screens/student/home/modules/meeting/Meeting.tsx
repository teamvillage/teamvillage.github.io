import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './meeting.module.scss';
import { assetType, loadAsset } from '../../../../../utils/AssetController';
import { Button } from '../../../../../components';
import { ReportInfo, TeamInfo, TodoInfo, addReport, endMeeting, startMeeting } from '../../../../../store/slices/teamSlice';
import Base from '../../../base/Base';
import recordImg1 from './recordImg1.png';
import recordImg2 from './recordImg2.png';
import percent from './percent.png';
import fEmoji1 from './f_emoji1.png';
import fEmoji1A from './f_emoji1_ano.png';
import fEmoji2 from './f_emoji2.png';
import fEmoji2A from './f_emoji2_ano.png';
import mEmoji1 from './m_emoji1.png';
import mEmoji1A from './m_emoji1_ano.png';
import mEmoji2 from './m_emoji2.png';
import mEmoji2A from './m_emoji2_ano.png';
import micOn from './mic_on.png';
import settingIcon from './settingIcon.png';
import arrowlb from './arrow_lb.png';
import cameraIcon from './cameraIcon.png';
import { RootState } from '../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { defaultUsers, User } from '../../../../../store/slices/userSlice';
import step1Img from './step1_img.png';
import step2Img from './step2_img.png';
import step3Img from './step3_img.png';
import star from './star.png';
import starActive from './star_active.png';
import groupImg from './group_img.png';
import xIcon from './x_icon.png';

interface Props {
  title: string;
  meetings?: Array<ReportInfo>;
  team?: TeamInfo;
}

export default function Meeting({title, meetings, team}:Props) {
  const moment = require('moment');

  const [cloverIcon, setCloverIcon] = useState('');
  const [isMeeting, setIsMeeting] = useState(false);
  const [isMeetExist, setIsMeetExist] = useState(false);
  const [isYello, setIsYello] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isTaskModal, setIsTaskModal] = useState(false);
  const [recentMeetings, setRecentMeetings] = useState<Array<ReportInfo>>([]);
  const [isCamera, setIsCamera] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<TodoInfo>>([]);
  const videoRef = useRef<HTMLVideoElement|null>();
  const isMounted = useRef<boolean>(false);
  const [stream, setStream] = useState<MediaStream|null>(null);
  const [showMeetingPage, setShowMeetingPage] = useState(true);
  const [countTimer, setCountTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();
  const me = useSelector((state:RootState) => state.user.user);
  const users: Array<User> = defaultUsers.slice(1, 4);
  const dispatch = useDispatch();

  useEffect(() => {
    loadAsset('clover_icon.svg', assetType.image)
      .then(img => setCloverIcon(img.default));
  }, []);

  useLayoutEffect(() => {
    let sortedMeets = meetings
    ?.filter(meet => {
      return !meet.isEnd;
    }).sort((a, b) => moment(a.startTime).diff(moment(b.startTime), 'seconds'));
    
    if (sortedMeets !== undefined && sortedMeets.length > 0)
      setRecentMeetings(sortedMeets);
    else
      setRecentMeetings([]);
  }, [meetings]);

  const countdown = () => {
    timerRef.current = setInterval(() => {
      setCountTimer(countTimer + 1);
    }, 1000);
  }
  useEffect(() => {
    if (isMeeting)
      countdown()
    else {
      clearInterval(timerRef.current);
      setCountTimer(0);
    }

    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current);
    }
  }, [isMeeting, countTimer]);

  useLayoutEffect(() => {
    if (recentMeetings.length > 0) {
      setIsMeetExist(true);
      if (recentMeetings[0].isStart && !recentMeetings[0].isEnd)
        setIsMeeting(true);
    }
    else {
      setIsMeetExist(false);
      setIsMeeting(false);
    }
  }, [recentMeetings]);

  useEffect(() => {
    if (isMounted.current) {
      const getUserDevices = async () => {
        const media = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 230,
            height: 405
          }
        });
        media.getTracks().forEach(e => {
          if (e.id != media.getVideoTracks()[0].id)
            e.stop();
        });
        return media
      }

      if (stream == null)
        getUserDevices().then(media => setStream(media));
      else {
        if (isCamera) {
          getUserDevices().then(media => {
            stream.addTrack(media.getVideoTracks()[0]);
            setStream(media);
          });
        }
        else {
          stream.getVideoTracks()[0].stop();
          stream.removeTrack(stream.getVideoTracks()[0]);
        }
      }
    }
  }, [isCamera]);

  useEffect(() => {
    if (videoRef.current)
      videoRef.current.srcObject = stream;
  }, [stream]);

  const inputRefs = useRef<Array<HTMLInputElement|null>>([]);
  const [meetTitle, setMeetTitle] = useState('');
  const [meetDate, setMeetDate] = useState('');
  const [meetStartTime, setMeetStartTime] = useState('');
  const [meetEndTime, setMeetEndTime] = useState('');
  const createMeetingModal = () => (
    <div className={styles.modal}>
      <div className={styles.createMeeting}>
        <p className={styles.title}>회의 예약</p>
        <div className={styles.content}>
          <label>회의명</label>
          <input 
            className={styles.name} 
            type='text' 
            placeholder='회의명을 입력하세요.'
            onChange={e => setMeetTitle(e.target.value)}
            ref = {e => inputRefs.current[0] = e}
            />
          <label>날짜</label>
          <input 
            className={styles.date} 
            type='text' 
            placeholder='2023.09.25'
            onChange={e => setMeetDate(e.target.value)}
            ref = {e => inputRefs.current[1] = e} />
          <label>시간</label>
          <div className={styles.inputTime}>
            <div className={`${styles.time} ${styles.start}`}>
              <input 
                type='text' 
                placeholder='1:00'
                onChange={e => setMeetStartTime(e.target.value)}
                ref = {e => inputRefs.current[2] = e} />
              <Button className={styles.timeBtn}><p>PM</p></Button>
            </div>
            <div className={`${styles.time} ${styles.end}`}>
              <input 
                type='text' 
                placeholder='2:00'
                onChange={e => setMeetEndTime(e.target.value)}
                ref = {e => inputRefs.current[3] = e} />
              <Button className={styles.timeBtn}><p>PM</p></Button>
            </div>
          </div>
          <label>알림</label>
          <input className={styles.name} type='text' placeholder='알림 선택' />
        </div>
        <div className={styles.btns}>
          <Button className={`${styles.btn} ${styles.cancel}`}
          onClick={() => {setIsModal(false);}}>
            <p>취소</p>
          </Button>
          <Button className={`${styles.btn} ${styles.reserve}`}
          onClick={() => {
            if (meetTitle != '' && meetDate != '' &&
                meetStartTime != '' && meetEndTime != '') {
              const newReport = new ReportInfo({
                title: meetTitle,
                users: [me, ...users],
                startTime: moment(meetDate + ' ' + meetStartTime, 'YYYY.MM.DD HH:mm').format(),
                endTime: moment(meetDate + ' ' + meetEndTime, 'YYYY.MM.DD HH:mm').format()
              });
              if (team) {
                setMeetTitle('');
                setMeetDate('');
                setMeetStartTime('');
                setMeetEndTime('');
                inputRefs.current.map(e => e!.value = '');
                // let meets = meetings?.slice();
                // meets?.push(newReport);
                // meetings = meets;
                // dispatch(addReport([team, newReport]));
              }
              setIsModal(false);
            }
            else {
              if (meetTitle == '') {
                setMeetTitle('나이키 SWOT 분석');
                inputRefs.current[0]!.value = '나이키 SWOT 분석';
              }
              if (meetDate == '') {
                setMeetDate('2023.10.30');
                inputRefs.current[1]!.value = '2023.09.30';
              }
              if (meetStartTime == '') {
                setMeetStartTime('1:00');
                inputRefs.current[2]!.value = '1:00';
              }
              if (meetEndTime == '') {
                setMeetEndTime('2:00');
                inputRefs.current[3]!.value = '2:00';
              }
            }
          }}>
            <p>예약</p>
          </Button>
        </div>
      </div>
    </div>
  );

  const meeting = () => {
    const customHeader = (
      <input className={styles.header} type='text' placeholder='회의 제목을 입력해주세요.' />
    );

    return (showMeetingPage &&
      <div className={styles.meetingScreen} id='meetingScreen'>
        <Base customHeader={customHeader}>
          <div className={styles.wrapper}>
            <div className={styles.gridBase}>
              <div className={styles.recording}>
                <div className={styles.info}>
                  <p>AI 기록 및 분석중</p>
                  <div className={styles.recordIcon}>
                    <div className={styles.recordIconInner}></div>
                  </div>
                </div>
                <div className={styles.recordImg}>
                  <img src={recordImg1} alt='img' />
                  <div className={styles.recordLine}></div>
                  <img src={recordImg2} alt='img' />
                </div>
              </div>
              <div className={styles.tasks}>
                <div className={styles.taskInfo}>
                  <p>오늘의 태스크</p>
                </div>
                <div className={styles.taskContent}>
                  {tasks.length == 0 ?
                  <Button className={styles.addBtn} onClick={() => setIsTaskModal(true)}>
                    <p>+ 태스크 추가</p>
                  </Button>
                  :
                  tasks.map((task, i) => (
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
              <div className={styles.memo}>
                <div className={styles.memoInfo}>
                  <p>오늘의 메모</p>
                </div>
                <div className={styles.memoContent}>
                  <Button className={styles.addBtn}>
                    <p>+</p>
                    <p>새메모 추가</p>
                  </Button>
                </div>
                <div className={styles.memoOption}>
                  <Button><p>B</p></Button>
                  <Button><p>U</p></Button>
                  <Button><p>S</p></Button>
                </div>
              </div>
              <div className={styles.percent}>
                <div className={styles.percentInfo}>
                  <p>회의 분위기 <span>with AI</span></p>
                </div>
                <img src={percent} alt='percent' />
              </div>
              <div className={`${styles.person} ${styles.person1}`}>
                <img src={fEmoji1} alt='emoji' />
                <div className={styles.personName}>
                  <p>{recentMeetings[0].users[1].name}</p>
                </div>
                <div className={styles.micInfo}>
                  <div className={styles.emoji}>
                    <img src={fEmoji1A} alt='emoji'/>
                  </div>
                  <div className={styles.mic}>
                    <img src={micOn} alt='mic' />
                  </div>
                </div>
              </div>
              <div className={`${styles.person} ${styles.person2}`}>
                <img src={mEmoji1} alt='emoji' />
                <div className={styles.personName}>
                  <p>{recentMeetings[0].users[3].name}</p>
                </div>
                <div className={styles.micInfo}>
                  <div className={styles.emoji}>
                    <img src={mEmoji1A} alt='emoji'/>
                  </div>
                  <div className={styles.mic}>
                    <img src={micOn} alt='mic' />
                  </div>
                </div>
              </div>
              <div className={`${styles.person} ${styles.person3}`}>
                {isCamera ? 
                <video ref={e => videoRef.current = e} autoPlay playsInline></video>
                :
                <img src={fEmoji2} alt='emoji' />
                }
                <div className={styles.personName}>
                  <p>{recentMeetings[0].users[0].name} (나)</p>
                </div>
                <div className={styles.micInfo}>
                  <div className={styles.emoji}>
                    <img src={fEmoji2A} alt='emoji'/>
                  </div>
                  <div className={styles.mic}>
                    <img src={micOn} alt='mic' />
                  </div>
                </div>
              </div>
              <div className={`${styles.person} ${styles.person4}`}>
                <img src={mEmoji2} alt='emoji' />
                <div className={styles.personName}>
                  <p>{recentMeetings[0].users[2].name}</p>
                </div>
                <div className={styles.micInfo}>
                  <div className={styles.emoji}>
                    <img src={mEmoji2A} alt='emoji'/>
                  </div>
                  <div className={styles.mic}>
                    <img src={micOn} alt='mic' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Base>
      </div>
    )
  };

  const fab = () => {
    const toggleCamera = () => {
      setIsCamera(!isCamera);
    }

    return (
      <div className={styles.fab}>
        <div className={styles.personInfo}>
          <div className={styles.emoji}>
            <img src={fEmoji2A} alt='emoji' />
          </div>
          <div className={styles.people}>
            <p>{recentMeetings[0].users[0].name}</p>
            <p>외 {recentMeetings[0].users.length - 1}명</p>
          </div>
        </div>
        <div className={styles.control}>
          <Button className={`${styles.camera} ${isCamera ? styles.onAir : ''}`} onClick={toggleCamera}>
            <img src={isCamera ? cameraIcon : fEmoji2A} alt='emoji' />
          </Button>
          <Button className={styles.mute}>
            <img src={micOn} alt='mic' />
          </Button>
          <Button className={styles.setting}>
            <img src={settingIcon} alt='setting' />
          </Button>
          <Button className={`${styles.minimize} ${showMeetingPage ? '' : styles.setRotate}`} onClick={() => setShowMeetingPage(!showMeetingPage)}>
            <img src={arrowlb} alt='arrow' />
          </Button>
        </div>
        <Button className={styles.end} onClick={() => {
          stream?.getTracks().forEach(e => e.stop());
          setStream(null);
          isMounted.current = false;
          setIsMeeting(false);
          setRecentMeetings(recentMeetings.slice(1));
          dispatch(endMeeting(recentMeetings[0]));
          setIsYello(true);
        }}>
          <p>회의 끝내기</p>
        </Button>
      </div>
    )
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [currentTasks, setCurrentTasks] = useState<Array<TodoInfo>>([]);
  const checkRef = useRef<Array<Array<HTMLImageElement | null>>>([]);
  const createTaskModal = () => {
    const stepImgs = [step1Img, step2Img, step2Img, step3Img];
    const checkStars = (idx: number, end: number) => {
      for (let i = 0; i <= end; i++)
        checkRef.current[idx][i]!.src = starActive;
      for (let i = end + 1; i < 5; i++)
        checkRef.current[idx][i]!.src = star;
    }

    return (
    <div className={`${styles.modal} ${styles.createTasks}`}>
      <div className={styles.createTask}>
        <div className={styles.top}>
          <img src={stepImgs[currentStep - 1]} />
          <Button onClick={() => setIsTaskModal(false)}>
            <img src={xIcon} />
          </Button>
        </div>
        <div className={styles.info}>
          {currentStep == 1 ? 
          <div>
            <p>오늘의 태스크 리스트업</p>
            <p>수행해야 하는 태스크를 리스트업 해주세요.</p>
            <p>자세하면 자세할수록 좋습니다.</p>
          </div>
          :
          currentStep == 2 ?
          <div>
            <p>태스크 난이도 설정</p>
            <p>앞서 리스트업한 태스크에</p>
            <p>각자의 역량에 따라 별을 매겨주세요.</p>
          </div>
          :
          currentStep == 3 ?
          <div>
            <p>AI 태스크 분배 중</p>
            <p>AI가 난이도와 역량에 따라</p>
            <p>태스크를 분배하고 있습니다.</p>
          </div>
          :
          <div>
            <p>태스크 분배 완료</p>
            <p>AI가 분석하여 각자의 역량에 맞게</p>
            <p>태스크를 분배하였습니다.</p>
            <p>모두가 동일하게 측정한 태스크는 랜덤으로 배치되며,</p>
            <p>해당 결과는 팀원 내 의사소통을 통해 조정이 가능합니다.</p>
          </div>
          }
        </div>
        <div className={styles.bottom}>
          {currentStep == 1 ?
          <div className={styles.taskList}>
            {currentTasks.map((task, i) => (
              <div className={styles.task} key={i}>
                <p>{task.title}</p>
                <p>{moment(task.due).format('MM.DD')}</p>
              </div>
            ))}
            <div className={`${styles.task} ${styles.input}`}>
              <p>논문 3개 요약해오기</p>
              <p>09.27</p>
            </div>
            <Button className={`${styles.task}`}
            onClick={() => {
              team?.reports.map(report => report.todos)
              .map(todos => {
                todos.map(todo => currentTasks.push(todo));
              });
            }}>
              <p>+ 태스크 추가하기</p>
            </Button>
          </div>
          :
          currentStep == 2 ?
          <div className={styles.taskList}>
            {currentTasks.map((task, i: number) => {
              checkRef.current[i] = [];
              task.importance = 0;

              return (
              <div className={styles.task} key={i}>
                <p>{task.title}</p>
                <div className={styles.stars}>
                  <Button onClick={() => {
                    checkStars(i, 0);
                    task.importance = 1;
                  }}>
                    <img src={star} ref={e => checkRef.current[i][0] = e} />
                  </Button>
                  <Button onClick={() => {
                    checkStars(i, 1);
                    task.importance = 2;
                  }}>
                    <img src={star} ref={e => checkRef.current[i][1] = e} />
                  </Button>
                  <Button onClick={() => {
                    checkStars(i, 2);
                    task.importance = 3;
                  }}>
                    <img src={star} ref={e => checkRef.current[i][2] = e} />
                  </Button>
                  <Button onClick={() => {
                    checkStars(i, 3);
                    task.importance = 4;
                  }}>
                    <img src={star} ref={e => checkRef.current[i][3] = e} />
                  </Button>
                  <Button onClick={() => {
                    checkStars(i, 4);
                    task.importance = 55;
                  }}>
                    <img src={star} ref={e => checkRef.current[i][4] = e} />
                  </Button>
                </div>
              </div>
            )})}
          </div>
          :
          currentStep == 3 ?
          <div className={styles.img}>
            <img src={groupImg} />
          </div>
          :
          currentStep == 4 ?
          <div className={`${styles.taskList} ${styles.taskCheck}`}>
            {currentTasks.map((task, i) => (
              <div key={i} className={task.user.isEqual(me) ? styles.me : ''}>
                <div><img src={task.user.emoji} /></div>
                <p>{task.title}</p>
              </div>
            ))}
          </div>
          :
          <></>
          }
        </div>
        {currentStep == 1 ?
        <Button className={styles.btn} onClick={() => setCurrentStep(currentStep + 1)}>
          <p>확인</p>
        </Button>
        :
        <div className={styles.btns}>
          <Button onClick={() => setCurrentStep(currentStep - 1)}>
            <p>{currentStep == 4 ? "태스크 분배" : "이전"}</p>
          </Button> 
          <Button onClick={() => {
            if (currentStep == 4) {
              setIsTaskModal(false);
              setTasks(currentTasks);
            }
            else
              setCurrentStep(currentStep + 1)
          }}>
            <p>다음</p>
          </Button>
        </div>
        }
      </div>
    </div>
  )}

  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={styles.meeting}>
      <div className={styles.shadow}>
        <div className={`${styles.background} ${isYello ? styles.yelloCard : ''}`}>
          <div className={styles.header}>
            <img src={cloverIcon} alt='logo' />
            <p>{isYello ? "옐로카드" : title}</p>
          </div>
          {isYello ? 
          <div className={styles.yello}>
            <div className={styles.info}>
              <p>지난 회의 때 적극성 부족으로 경고를 받았습니다.</p>
              <p>오늘은 그러지 않겠다는 뜻에서</p>
              <p><span>‘실패해도 좋아. 아이디어 많이 내자!'</span> 를 써주세요!</p>
            </div>
            <div className={styles.input}>
              <p>{isClicked ? "실패해도 좋아. 아이디어 많이 내자!" : ''}</p>
              <Button onClick={() => {
                if (isClicked) {
                  setIsClicked(false);
                  setIsYello(false);
                }
                setIsClicked(true);
              }}>
                <p>다음</p>
              </Button>
            </div>
          </div>
          :
          <div className={styles.content}>
            <div className={styles.log}>
              {(isMeetExist && recentMeetings.length > 0) &&
              <div className={styles.logContent}>
                <div className={styles.logBar}>
                  <div className={`${styles.logIcon} ${styles.active}`}></div>
                  <div className={styles.logIconBar}></div>
                  {recentMeetings.length > 1 &&
                  <div className={styles.logIcon}></div>}
                </div>
                <div className={styles.logText}>
                  <p className={`${styles.logTitle} ${styles.active}`}>
                    {recentMeetings[0].title}
                  </p>
                  <p className={styles.logTime}>
                    {moment(recentMeetings[0].startTime).format('YYYY.MM.DD')} | {moment(recentMeetings[0].startTime).format('HH:mm')}~{moment(recentMeetings[0].endTime).format('HH:mm')}
                  </p>
                  <div className={styles.logOption}>
                    <p>3시간 전 알림</p>
                    <p>자동시작</p>
                  </div>
                  {recentMeetings.length > 1 &&
                  <p className={styles.logTitle}>{recentMeetings[1].title}</p>}
                </div>
              </div>
              }
            </div>
            <div className={styles.buttons}>
              <Button className={`${styles.reserve} ${styles.btn}`}
              onClick={() => {setIsModal(true);}}>
                <p>예약하기</p>
              </Button>
              <Button 
                className={`${styles.start} ${styles.btn} ${isMeeting && styles.currentMeeting}`}
                onClick={() => {
                  if (isMeetExist && !isMeeting) {
                    setIsMeeting(true);
                    isMounted.current = true;
                    startMeeting(recentMeetings[0]);
                  }
                }}>
                <p>{isMeeting ? "회의중" : "시작하기"}</p>
                {(isMeeting && recentMeetings.length > 0) && 
                <p>+
                  {moment.utc(
                    moment(recentMeetings[0].startTime)
                    .add(countTimer, 's')
                    .diff(moment(recentMeetings[0].startTime))
                  ).format('HH:mm:ss')}
                </p>}
              </Button>
            </div>
          </div>
          }
        </div>
      </div>
      {isModal && createMeetingModal()}
      {isMeeting && meeting()}
      {isMeeting && fab()}
      {isTaskModal && createTaskModal()}
    </div>
  )
}