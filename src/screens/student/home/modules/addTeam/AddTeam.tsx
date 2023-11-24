import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import { RootState } from '../../../../../store';
import { TeamInfo } from '../../../../../store/slices/teamSlice';
import styles from './addTeam.module.scss';

import checkOk from './checkOk.png';
import checkNotOk from './checkNotOk.png';
import infoIcon from './infoIcon.png';

import userEmoji1 from '../../../../../assets/images/emojis/male1.png';
import userEmoji2 from '../../../../../assets/images/emojis/male2.png';
import userEmoji3 from '../../../../../assets/images/emojis/female1.png';
import userEmoji4 from '../../../../../assets/images/emojis/female2.png';
import { defaultUsers, User } from '../../../../../store/slices/userSlice';

interface Prop {
  onComplete: (team: TeamInfo) => any;
}

export default function AddTeam({onComplete}: Prop) {
  const [currentPage, setCurrentPage] = useState(0);
  const [codeNumber, setCodeNumber] = useState('');
  const [teamTitle, setTeamTitle] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [team3, setTeam3] = useState('');
  const [team4, setTeam4] = useState('');
  const [team5, setTeam5] = useState('');
  const inputRef = useRef<HTMLInputElement|null>(null);
  const me = useSelector((state:RootState) => state.user.user);

  const newTeam: TeamInfo = new TeamInfo({
    name: '',
    users: [],
    reports: []
  })
  const nextPage = (prev?: boolean) => {
    if (prev)
      setCurrentPage(currentPage - 1);
    else {
      if (currentPage == pages.length - 1) {
        const users: Array<User> = defaultUsers.slice(1, 4);

        newTeam.name = '광 | ' + teamTitle;
        newTeam.users = [me, ...users];
        onComplete(newTeam);
      }
      else {
        setCurrentPage(currentPage + 1);
        if (inputRef.current)
          inputRef.current.value = '';
        if (peopleOkRef.current)
          peopleOkRef.current.map(e => {if (e) e.src = checkNotOk;})
      }
    }
  }
  
  const introduction = (
    <div>
      <p className={styles.title}>
        새 프로젝트 그룹을 추가해주세요
      </p>
      <div className={`${styles.content} ${styles.introduction}`}>
        <p>팀빌리지에서 회의를 진행하기 위해서는 프로젝트 그룹을 추가해야 합니다.</p>
        <p>아래 버튼을 누르고, 안내에 따라 그룹을 추가해주세요.</p>
      </div>
      <Button className={styles.btn} onClick={() => {nextPage()}}>
        <p>프로젝트 시작하기</p>
      </Button>
    </div>
  )

  const code = (
    <div>
      <p className={styles.title}>
        새 프로젝트 그룹을 추가해주세요
      </p>
      <div className={`${styles.content} ${styles.code}`}>
        <p>과목코드를 입력해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={codeNumber.length == 8 ? styles.active : ''} 
            type='text' 
            placeholder='예) GMP30002' 
            onChange={e => {setCodeNumber(e.target.value);}}
            ref={e => inputRef.current = e} />
          {codeNumber.length == 8 && <img src={checkOk} alt='ok' />}
          {codeNumber.length == 8 && <p>광고와 사회</p>}
        </div>
        {codeNumber.length == 8 &&
        <div className={styles.emojiDiv}>
          <p>A팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <img src={userEmoji4} alt='emoji' />
            <img src={userEmoji3} alt='emoji' />
            <img src={userEmoji2} alt='emoji' />
            <img src={userEmoji1} alt='emoji' />
          </div>
        </div>
        }
      </div>
      <Button className={styles.btn} onClick={() => {
        if (codeNumber.length == 8) {
          nextPage();
          inputRef.current!.value = '';
        }
        else {
          inputRef.current!.value = 'GMP30002';
          setCodeNumber('GMP30002');
        }
      }}>
        <p>다음</p>
      </Button>
    </div>
  )

  const peopleOkRef = useRef<Array<HTMLImageElement|null>>([]);
  const handleOk = (control: boolean, variable: string = teamTitle) => {
    if (variable.length > 2 || control) {
      peopleOkRef.current.map((e, i) => {
        if (i == 0) return;
        if (e)
          setTimeout(() => e.src = checkOk, 
            1000 + (Math.random() - 0.5) * 1000);
      });
    }
    else if (variable.length < 3) {
      peopleOkRef.current.map(e => {
        if (e) e.src = checkNotOk;
      });
    }
  }
  const setTitle = (
    <div>
      <p className={styles.title}>
        새 프로젝트 그룹 이름을 설정해주세요.
      </p>
      <div className={`${styles.content} ${styles.setTitle}`}>
        <p>그룹 이름을 입력해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={teamTitle.length > 2 ? styles.active : ''} 
            type='text' 
            placeholder='어벤져스' 
            onChange={e => {setTeamTitle(e.target.value); handleOk(false);}}
            ref={e => inputRef.current = e} />
          {teamTitle.length > 2 && <img src={checkOk} alt='ok' />}
        </div>
        <div className={styles.emojiDiv}>
          <p>A팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <div>
              <img src={userEmoji4} alt='emoji' />
              <img src={teamTitle.length > 2 ? checkOk : checkNotOk} alt='check' ref={e => peopleOkRef.current[0] = e} />
            </div>
            <div>
              <img src={userEmoji3} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[1] = e} />
            </div>
            <div>
              <img src={userEmoji2} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[2] = e} />
            </div>
            <div>
              <img src={userEmoji1} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[3] = e} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {
          inputRef.current!.value = codeNumber;
          nextPage(true);
        }}>
          <p>이전</p>
        </Button>
        <Button className={styles.btn} onClick={() => {
          if (teamTitle.length > 2)
            nextPage();
          else {
            inputRef.current!.value = '어벤져스';
            setTeamTitle('어벤져스');
            handleOk(true);
          }
        }}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const complete = (
    <div>
      <div className={`${styles.title} ${styles.complete}`}>
        <div>
          <div><p>광고와 사회</p></div>
          <div><p>{teamTitle}</p></div>
        </div>
        <p>프로젝트 그룹 생성 완료</p>
      </div>
      <div className={`${styles.content}`}>
        <p>그룹 달성도를 설정하세요.</p>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {nextPage();}} >
          <p>다음에 하기</p>
        </Button>
        <Button className={styles.btn} onClick={() => {nextPage()}}>
          <p>설정하기</p>
        </Button>
      </div>
    </div>
  )

  const setTeam1Comp = (
    <div>
      <p className={styles.title}>
        팀 달성도 기준을 세워보세요.
      </p>
      <div className={`${styles.content} ${styles.setTitle}`}>
        <p>'{teamTitle}'만의 <strong>완성도</strong>에 대한 기준을 정의해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={team1.length > 2 ? styles.active : ''} 
            type='text' 
            placeholder="예) 주어진 과제를 '완료'하는 것이다." 
            onChange={e => {setTeam1(e.target.value); handleOk(false, team1);}}
            ref={e => inputRef.current = e} />
          {team1.length > 2 && <img src={checkOk} alt='ok' />}
        </div>
        <div className={styles.emojiDiv}>
          <p>{teamTitle}팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <div>
              <img src={userEmoji4} alt='emoji' />
              <img src={team1.length > 2 ? checkOk : checkNotOk} alt='check' ref={e => peopleOkRef.current[0] = e} />
            </div>
            <div>
              <img src={userEmoji3} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[1] = e} />
            </div>
            <div>
              <img src={userEmoji2} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[2] = e} />
            </div>
            <div>
              <img src={userEmoji1} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[3] = e} />
            </div>
          </div>
        </div>
      </div>
      <Button className={styles.btn} onClick={() => {
        if (team1.length > 2)
          nextPage();
        else {
          inputRef.current!.value = "우리의 완성도는 '완료'이다.";
          setTeam1(inputRef.current!.value);
          handleOk(true, team1);
        }}}>
        <p>다음</p>
      </Button>
    </div>
  )

  const setTeam2Comp = (
    <div>
      <p className={styles.title}>
        팀 달성도 기준을 세워보세요.
      </p>
      <div className={`${styles.content} ${styles.setTitle}`}>
        <p>'{teamTitle}'만의 <strong>성실성</strong>에 대한 기준을 정의해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={team2.length > 2 ? styles.active : ''} 
            type='text' 
            placeholder="예) 정해놓은 기간과 시간에 늦지 않는 것이다." 
            onChange={e => {setTeam2(e.target.value); handleOk(false, team2);}}
            ref={e => inputRef.current = e} />
          {team2.length > 2 && <img src={checkOk} alt='ok' />}
        </div>
        <div className={styles.emojiDiv}>
          <p>{teamTitle}팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <div>
              <img src={userEmoji4} alt='emoji' />
              <img src={team2.length > 2 ? checkOk : checkNotOk} alt='check' ref={e => peopleOkRef.current[0] = e} />
            </div>
            <div>
              <img src={userEmoji3} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[1] = e} />
            </div>
            <div>
              <img src={userEmoji2} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[2] = e} />
            </div>
            <div>
              <img src={userEmoji1} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[3] = e} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {nextPage(true);}} >
          <p>이전</p>
        </Button>
        <Button className={styles.btn} onClick={() => {
          if (team2.length > 2)
            nextPage();
          else {
            inputRef.current!.value = "9시 1분은 9시가 아니다.";
            setTeam2(inputRef.current!.value);
            handleOk(true, team2);
          }}}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const setTeam3Comp = (
    <div>
      <p className={styles.title}>
        팀 달성도 기준을 세워보세요.
      </p>
      <div className={`${styles.content} ${styles.setTitle}`}>
        <p>'{teamTitle}'만의 <strong>적극성</strong>에 대한 기준을 정의해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={team3.length > 2 ? styles.active : ''} 
            type='text' 
            placeholder="예) 많은 아이디어를 내고 피드백을 잘하는 것이다." 
            onChange={e => {setTeam3(e.target.value); handleOk(false, team3);}}
            ref={e => inputRef.current = e} />
          {team3.length > 2 && <img src={checkOk} alt='ok' />}
        </div>
        <div className={styles.emojiDiv}>
          <p>{teamTitle}팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <div>
              <img src={userEmoji4} alt='emoji' />
              <img src={team3.length > 2 ? checkOk : checkNotOk} alt='check' ref={e => peopleOkRef.current[0] = e} />
            </div>
            <div>
              <img src={userEmoji3} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[1] = e} />
            </div>
            <div>
              <img src={userEmoji2} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[2] = e} />
            </div>
            <div>
              <img src={userEmoji1} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[3] = e} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {nextPage(true);}} >
          <p>이전</p>
        </Button>
        <Button className={styles.btn} onClick={() => {
          if (team3.length > 2)
            nextPage();
          else {
            inputRef.current!.value = "실패해도 좋아. 아이디어 많이 내기!";
            setTeam3(inputRef.current!.value);
            handleOk(true, team3);
          }}}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const setTeam4Comp = (
    <div>
      <p className={styles.title}>
        팀 달성도 기준을 세워보세요.
      </p>
      <div className={`${styles.content} ${styles.setTitle}`}>
        <p>'{teamTitle}'만의 <strong>협력</strong>에 대한 기준을 정의해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={team4.length > 2 ? styles.active : ''} 
            type='text' 
            placeholder="예) 태스크를 동등하고 역량에 맞게 팀 활동을 수행하는 것이다." 
            onChange={e => {setTeam4(e.target.value); handleOk(false, team4);}}
            ref={e => inputRef.current = e} />
          {team4.length > 2 && <img src={checkOk} alt='ok' />}
        </div>
        <div className={styles.emojiDiv}>
          <p>{teamTitle}팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <div>
              <img src={userEmoji4} alt='emoji' />
              <img src={team4.length > 2 ? checkOk : checkNotOk} alt='check' ref={e => peopleOkRef.current[0] = e} />
            </div>
            <div>
              <img src={userEmoji3} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[1] = e} />
            </div>
            <div>
              <img src={userEmoji2} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[2] = e} />
            </div>
            <div>
              <img src={userEmoji1} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[3] = e} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {nextPage(true);}} >
          <p>이전</p>
        </Button>
        <Button className={styles.btn} onClick={() => {
          if (team4.length > 2)
            nextPage();
          else {
            inputRef.current!.value = "연락두절을 비롯한 모든 잠수 행위는 금한다.";
            setTeam4(inputRef.current!.value);
            handleOk(true, team4);
          }}}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const setTeam5Comp = (
    <div>
      <p className={styles.title}>
        팀 달성도 기준을 세워보세요.
      </p>
      <div className={`${styles.content} ${styles.setTitle}`}>
        <p>'{teamTitle}'만의 <strong>존중</strong>에 대한 기준을 정의해주세요.</p>
        <div className={styles.inputDiv}>
          <input 
            className={team5.length > 2 ? styles.active : ''} 
            type='text' 
            placeholder="예) 상대방의 의견에 적극적인 반응을 하는 것이다." 
            onChange={e => {setTeam5(e.target.value); handleOk(false, team5);}}
            ref={e => inputRef.current = e} />
          {team5.length > 2 && <img src={checkOk} alt='ok' />}
        </div>
        <div className={styles.emojiDiv}>
          <p>{teamTitle}팀 <img src={infoIcon} alt='info' /></p>
          <div className={styles.emoji}>
            <div>
              <img src={userEmoji4} alt='emoji' />
              <img src={team5.length > 2 ? checkOk : checkNotOk} alt='check' ref={e => peopleOkRef.current[0] = e} />
            </div>
            <div>
              <img src={userEmoji3} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[1] = e} />
            </div>
            <div>
              <img src={userEmoji2} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[2] = e} />
            </div>
            <div>
              <img src={userEmoji1} alt='emoji' />
              <img src={checkNotOk} alt='check' ref={e => peopleOkRef.current[3] = e} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {nextPage(true);}} >
          <p>이전</p>
        </Button>
        <Button className={styles.btn} onClick={() => {
          if (team5.length > 2)
            nextPage();
          else {
            inputRef.current!.value = "상대의 의견을 경청합시다.";
            setTeam5(inputRef.current!.value);
            handleOk(true, team5);
          }}}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const setTeamCompCheck = (
    <div className={styles.compCheck}>
      <p className={styles.title}>마지막으로 다시 한번 확인해주세요.</p>
      <p>완료 시 메인화면으로 이동합니다.</p>
      <div className={styles.content}>
        <div><p>완성도</p><p>{team1}</p></div>
        <div><p>적극성</p><p>{team2}</p></div>
        <div><p>성실성</p><p>{team3}</p></div>
        <div><p>협&nbsp;&nbsp;&nbsp;&nbsp;력</p><p>{team4}</p></div>
        <div><p>존&nbsp;&nbsp;&nbsp;&nbsp;중</p><p>{team5}</p></div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={() => {nextPage(true);}} >
          <p>이전</p>
        </Button>
        <Button className={styles.btn} onClick={() => {
          if (team5.length > 2)
            nextPage();
          else {
            inputRef.current!.value = "상대의 의견을 경청합시다.";
            setTeam5(inputRef.current!.value);
            handleOk(true, team5);
          }}}>
          <p>다음</p>
        </Button>
      </div>
    </div>
  )

  const pages = [
    introduction,
    code,
    setTitle,
    complete,
    setTeam1Comp,
    setTeam2Comp,
    setTeam3Comp,
    setTeam4Comp,
    setTeam5Comp,
    setTeamCompCheck
  ]

  return (
    <div className={styles.addTeam}>
      {pages[currentPage]}
    </div>
  )
}