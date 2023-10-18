import styles from './tanagement.module.scss';
import { loadAsset, assetType } from '../../../../../utils/AssetController';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../../components';

import tempImg from '../../../../../assets/images/temp_screenshot.png';

interface Prop {
  onComplete: () => any;
}

function Tanagement({onComplete}: Prop) {
  const [logoIcon, setLogoIcon] = useState('');
  const [searchIcon, setSearchIcon] = useState('');
  const [checkIcon, setCheckIcon] = useState('');
  const [flagIcon, setFlagIcon] = useState('');
  const [checkBlackIcon, setCheckBlackIcon] = useState('');
  const [clockIcon, setClockIcon] = useState('');
  const [homeIcon, setHomeIcon] = useState('');
  const [timer, setTimer] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timer == 0) {
      submitQuestion();
      setTimer(25);
      return;
    }
    
    timerRef.current = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    if (!isMounted)
      clearTimeout(timerRef.current);
  }, [timer]);

  useEffect(() => {
    loadAsset('tanagement_home_icon.png', assetType.image)
      .then(image => setLogoIcon(image.default));
    loadAsset('search_icon.png', assetType.image)
      .then(image => setSearchIcon(image.default));
    loadAsset('check_icon.png', assetType.image)
      .then(image => setCheckIcon(image.default));
    loadAsset('flag_icon.png', assetType.image)
      .then(image => setFlagIcon(image.default));
    loadAsset('check_black_icon.png', assetType.image)
      .then(image => setCheckBlackIcon(image.default));
    loadAsset('clock_icon.svg', assetType.image)
      .then(image => setClockIcon(image.default));
    loadAsset('home_icon.png', assetType.image)
      .then(image => setHomeIcon(image.default));
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const problemList = [
    ["나는 다른 사람의\n감정이 느껴진다", "나는 다른 사람의\n성장 가능성이 보인다"],
    ["완벽하지 않더라도\n일을 성실하게 하는 것이\n중요하다.", "늦더라도 완벽하게\n일을 끝내는 것이\n중요하다."],
    ["반드시 해야 하는\n일이 아니라면\n다음주로 넘긴다.", "시간이 걸려도\n완성도 있게\n하나씩 끝낸다."]
  ]

  const instruction = (
    <div className={styles.instruction}>
      <div className={styles.icon}>
        <img src={logoIcon} alt='logo' />
      </div>
      <p className={styles.title}>
        태니지먼트 테스트를 진행해주세요.
      </p>
      <p className={styles.subtitle}>
        나의 강점, 약점, 성향 분석을 기반으로 팀포메이션이 진행됩니다.
      </p>
      <div className={styles.content}>
        <div className={styles.search}>
          <img src={searchIcon} alt='search' />
          <div>
            <p>나만의 특별한</p>
            <p>강점을 발견</p>
          </div>
        </div>
        <div className={styles.check}>
          <img src={checkIcon} alt='check' />
          <div>
            <p>가장 좋아하면서</p>
            <p>잘할 수 있는 일을 찾기</p>
          </div>
        </div>
        <div className={styles.flag}>
          <img src={flagIcon} alt='flag' />
          <div>
            <p>성공적 협업</p>
            <p>준비하기</p>
          </div>
        </div>
      </div>
      <Button className={styles.startTest} onClick={() => {setCurrentPage(1);}}>
        <p>테스트 시작하기</p>
      </Button>
    </div>
  )

  const instruction_start = (
    <div className={`${styles.instruction} ${styles.instructionStart}`}>
      <div className={styles.icon}>
      </div>
      <p className={styles.title}>
        태니지먼트 테스트를 시작합니다
      </p>
      <p className={styles.subtitle}>
        총 40문항 약 25분 소요
      </p>
      <div className={styles.content}>
        <div className={styles.problemInstruction}>
          <div>
            <img src={checkBlackIcon} alt='check' />
            <p>문항을 읽고 5개의 척도 중 가장 가까운 것을 선택하세요</p>
          </div>
          <div>
            <img src={checkBlackIcon} alt='check' />
            <p>문항 당 제한시간은 25초입니다</p>
          </div>
        </div>
      </div>
      <Button className={styles.startTest} onClick={() => {setIsMounted(true); setTimer(25); setCurrentPage(2);}}>
        <p>시작하기</p>
      </Button>
    </div>
  )

  const submitQuestion = () => {
    clearTimeout(timerRef.current);
    setTimeout(() => {
      document.getElementsByName('check').forEach(elem => {
        (elem as HTMLInputElement).checked = false;
      });
      if (currentQuestion == problemList.length - 1) {
        setCurrentPage(3);
        setTimeout(() => {setCurrentPage(4)}, 2000);
      }
      else {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(25);
      }
    }, 500);
  }
  const questions = (
    <div className={styles.question}>
      <div className={styles.questionInstruction}>
        <p>Q{currentQuestion + 1}. 문항을 읽고 5개의 척도 중 가장 가까운 것을 선택하세요</p>
        <div className={styles.timer}>
          <img src={clockIcon} alt='timer' />
          <p>{timer}</p>
        </div>
      </div>
      <div className={styles.questions}>
        <div className={styles.optionInst}>
          <p>{problemList[currentQuestion][0]}</p>
        </div>
        <div className={styles.optionInst}>
          <p>{problemList[currentQuestion][1]}</p>
        </div>
      </div>
      <form className={styles.selectRadio}>
        <div className={styles.option} onClick={submitQuestion}>
          <p>1</p>
          <input type='radio' name='check'/>
          <p>매우 그렇다</p>
        </div>
        <div className={styles.option} onClick={submitQuestion}>
          <p>2</p>
          <input type='radio' name='check'/>
          <p>가끔 그렇다</p>
        </div>
        <div className={styles.option} onClick={submitQuestion}>
          <p>3</p>
          <input type='radio' name='check'/>
          <p>둘다 아니다</p>
        </div>
        <div className={styles.option} onClick={submitQuestion}>
          <p>4</p>
          <input type='radio' name='check'/>
          <p>가끔 그렇다</p>
        </div>
        <div className={styles.option} onClick={submitQuestion}>
          <p>5</p>
          <input type='radio' name='check'/>
          <p>매우 그렇다</p>
        </div>
      </form>
      <div className={styles.buttons}>
        <Button className={`${styles.save} ${styles.btn}`}>
          <p>저장하기</p>
        </Button>
        <Button className={`${styles.pause} ${styles.btn}`}>
          <p>잠시 멈추기</p>
        </Button>
      </div>
    </div>
  )

  const analyzing = (
    <div className={styles.analyzing}>
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

  const checkOk = () => {
    onComplete();
  }
  const result = (
    <div className={styles.result}>
      <div className={styles.tempImg}>
        <img src={tempImg} alt='temp' />
      </div>
      <div className={styles.buttons}>
        <Button className={styles.download}>
          <p>나의 리포트 PDF 다운</p>
        </Button>
        <Button className={styles.ok} onClick={checkOk}>
          <p>확인</p>
        </Button>
      </div>
    </div>
  )

  const pages = [
    instruction,
    instruction_start,
    questions,
    analyzing,
    result
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {pages[currentPage]}
      </div>
    </div>
  )
}

export default Tanagement;