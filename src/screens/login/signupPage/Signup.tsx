import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components';
import { assetType, loadAsset } from '../../../utils/AssetController';
import styles from './signup.module.scss';

function Signup() {
  const [page, setPage] = useState(1);
  const [logoImage, setLogoImage] = useState('');
  const [signupCompleteIcon, setSignupCompleteIcon] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    loadAsset('logo_long.png', assetType.image)
      .then(img => setLogoImage(img.default));
    loadAsset('signup_complete_icon.png', assetType.image)
      .then(img => setSignupCompleteIcon(img.default));
      loadAsset('Background_signup.png', assetType.image)
        .then(img => setBackgroundImage(img.default));
  }, []);

  const inputContextWithButton = (
    type: string, 
    id: string, 
    placeholder?: string,
    button?: string,
    buttonClassName?: string,
    formClassName?: string,
   ) => (
    <div className={`${styles.inputForm} ${formClassName}`}>
      <input type={type} placeholder={placeholder} id={id} />
      {
        (button != '') &&
        <Button className={`${buttonClassName} ${styles.btn}`}>
          <p>{button}</p>
        </Button>
      }
    </div>
  );

  const page1 = () => {
    const checkInput = () => {
      setPage(2);
    }

    return (
      <div className={`${styles.page} ${styles.page1}`}>
        <div className={styles.headerInfo}>
          <p className={styles.h1}>팀빌리지 이용에 필요한 상세 정보를 입력해주세요.</p>
          <p className={styles.h2}>서비스 이용에 가장 중요한 단계입니다. 신중히 선택해주세요.</p>
        </div>
        <div className={styles.form}>
          <div className={styles.schoolForm}>
            <label>학교명 <span>*</span></label>
            <div className={styles.empty}></div>
            {inputContextWithButton('text', 'school', '직접입력', '학교찾기')}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.number}>
              <label>학번/직번 <span>*</span></label>
            <div className={styles.empty}></div>
              {inputContextWithButton('text', 'number', '직번을 입력해주세요.', '')}
            </div>
            <div className={styles.empty}></div>
            <div className={styles.major}>
              <label>전공 <span>*</span></label>
              <div className={styles.empty}></div>
              {inputContextWithButton('text', 'major', '전공을 선택해주세요.', '')}
            </div>
          </div>
          <div className={styles.emailForm}>
            <label>학교 이메일 <span>*</span></label>
            <div className={styles.empty}></div>
            {inputContextWithButton('text', 'email', '이메일을 입력해주세요.', '인증하기')}
            {inputContextWithButton('text', 'code', '인증코드', '확인', '', styles.code)}
          </div>
        </div>
        <Button className={styles.okBtn} onClick={checkInput}>
          <p>다음</p>
        </Button>
      </div>
    )
  }

  const page2 = () => {
    const changePrev = () => {
      setPage(1);
    }
    
    const checkInput = () => {
      setPage(3);
    }

    return (
      <div className={`${styles.page} ${styles.page2}`}>
        <div className={styles.headerInfo}>
          <p className={styles.h1}>팀빌리지 이용에 필요한 상세 정보를 입력해주세요.</p>
          <p className={styles.h2}>서비스 이용에 가장 중요한 단계입니다. 신중히 선택해주세요.</p>
        </div>
        <div className={styles.form}>
          <div className={styles.nameForm}>
            <label>이름 <span>*</span></label>
            <div className={styles.empty}></div>
            {inputContextWithButton('text', 'name', '이름을 입력해주세요', 'Invisiable', styles.hideBtn)}
          </div>
          <div className={styles.idForm}>
            <label>ID <span>*</span></label>
            <div className={styles.empty}></div>
            {inputContextWithButton('text', 'id', '직접입력', '중복확인')}
          </div>
          <div className={styles.pwForm}>
            <label>PW <span>*</span></label>
            <div className={styles.empty}></div>
            {inputContextWithButton('password', 'pw', '직접입력', 'Invisiable', styles.hideBtn, styles.pwInput)}
            {inputContextWithButton('password', 'pwCheck', '다시 한번 입력해주세요', 'Invisiable', styles.hideBtn, styles.pwCheck)}
          </div>
        </div>
        <div className={styles.okBtn}>
          <Button className={styles.prev} onClick={changePrev}>
            <p>이전</p>
          </Button>
          <Button className={styles.next} onClick={checkInput}>
            <p>다음</p>
          </Button>
        </div>
      </div>
    )
  }

  const page3 = () => {
    return (
      <div className={`${styles.page} ${styles.page3}`}>
        <div className={styles.headerInfo}>
          <img src={signupCompleteIcon} alt='signup-complete-icon' />
        </div>
        <div className={styles.comment}>
          <p className={styles.h1}>회원가입이 완료되었습니다!</p>
          <p className={styles.h2}>서비스 이용을 원하신다면 오그린 해주세요.</p>
        </div>
        <Link to='/'>
          <Button className={styles.okBtn}>
            <p>로그인 화면 돌아가기</p>
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.signup}>
        <div className={styles.header}>
          <Link to='/'>
            <img src={logoImage} alt='logo' />
          </Link>
        </div>
        <div className={styles.content}>
          <div className={page == 1 ? styles.active : ''}> {page1()} </div>
          <div className={page == 2 ? styles.active : ''}> {page2()} </div>
          <div className={page == 3 ? styles.active : ''}> {page3()} </div>
        </div>
      </div>
      <div className={styles.background}>
        <img src={backgroundImage} alt='logo' />
      </div>
    </div>
  )
}

export default Signup;