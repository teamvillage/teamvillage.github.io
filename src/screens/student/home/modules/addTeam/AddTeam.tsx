import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import { RootState } from '../../../../../store';
import { TeamInfo } from '../../../../../store/slices/teamSlice';
import styles from './addTeam.module.scss';

import checkOk from './checkOk.png';
import checkNotOk from './checkNotOk.png';
import infoIcon from './infoIcon.png';

import userEmoji1 from '../../../../../assets/images/emojis/male1.svg';
import userEmoji2 from '../../../../../assets/images/emojis/male2.svg';
import userEmoji3 from '../../../../../assets/images/emojis/female1.svg';
import userEmoji4 from '../../../../../assets/images/emojis/female2.svg';

interface Prop {
  onComplete: (team: TeamInfo) => any;
}

export default function AddTeam({onComplete}: Prop) {
  const [currentPage, setCurrentPage] = useState(0);
  const [codeNumber, setCodeNumber] = useState('');
  const [teamTitle, setTeamTitle] = useState('');
  const inputRef = useRef<HTMLInputElement|null>(null);

  const newTeam: TeamInfo = {
    name: '',
    users: [],
    reports: []
  }
  const nextPage = () => {
    if (currentPage == pages.length - 1)
      onComplete(newTeam);
    else
      setCurrentPage(currentPage + 1);
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
      <Button className={styles.btn} onClick={nextPage}>
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
      }}>
        <p>다음</p>
      </Button>
    </div>
  )

  const peopleOkRef = useRef<Array<HTMLImageElement|null>>([]);
  const handleOk = () => {
    if (teamTitle.length > 2) {
      peopleOkRef.current.map((e, i) => {
        if (i == 0) return;
        if (e)
          setTimeout(() => e.src = checkOk, 
            2000 + (Math.random() - 0.5) * 2000);
      });
    }
    else if (teamTitle.length < 3) {
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
            onChange={e => {setTeamTitle(e.target.value); handleOk();}}
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
      <Button className={styles.btn} onClick={() => {
        if (codeNumber.length == 8)
          nextPage();
      }}>
        <p>다음</p>
      </Button>
    </div>
  )

  const pages = [
    introduction,
    code,
    setTitle
  ]

  return (
    <div className={styles.addTeam}>
      {pages[currentPage]}
    </div>
  )
}