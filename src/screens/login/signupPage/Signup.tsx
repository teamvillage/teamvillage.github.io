import React, { useState } from 'react';

import styles from './signup.module.scss';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';

function Signup() {
  const [page, setPage] = useState(1);
  const [isStudent, setIsStudent] = useState(true);

  const header = () => (
    <>
      <div>
        <p>팀빌리지</p>
      </div>
      <div>
        <p>회원가입</p>
      </div>
      {(page > 1) && (
      <div>
        <p>{isStudent ? "학생" : "교수"}</p>
      </div>
      )}
    </>
  )

  const carousel = (idx: number) => {
    const nPrev = idx - 1;
    const nNext = 3 - idx;
    let components = [];

    const deactive = <div className={styles.deactive}></div>;
    const active = <div className={styles.active}></div>;
    for (let i = 0; i < nPrev; i++) components.push(deactive);
    components.push(active);
    for (let i = 0; i < nNext; i++) components.push(deactive);

    return <div className={styles.carousel}>{components}</div>;
  }

  const inputContextWithButton = (placeholder: string, button: string, buttonClassName?: string, formClassName?: string) => (
    <div className={`${styles.inputForm} ${formClassName}`}>
      <input type='text' placeholder={placeholder} />
      <Button className={`${buttonClassName} ${styles.btn}`}>
        <p>{button}</p>
      </Button>
    </div>
  )

  const page1 = () => {
    const checkInput = () => {
      setPage(2);
    }

    return (
      <div className={styles.page1}>
        <div className={styles.header}>
          <p className={styles.h1}>팀빌리지 이용에 필요한 상세 정보를 입력해주세요.</p>
          <p className={styles.h2}>서비스 이용에 가장 중요한 단계입니다. 신중히 선택해주세요.</p>
        </div>
        <div className={styles.form}>
          <div className={styles.schoolForm}>
            <label>학교명*</label>
            {inputContextWithButton('직접입력', '학교찾기')}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.number}>
              <label>학번/직번*</label>
              <input type='text' placeholder='직번을 입력해주세요.' className={styles.numberInput} />
            </div>
            <div></div>
            <div className={styles.major}>
              <label>전공*</label>
              <input type='text' placeholder='드랍다운 디자인 넣어주세요' className={styles.majorInput} />
            </div>
          </div>
          <div className={styles.emailForm}>
            <label>학교 이메일*</label>
            {inputContextWithButton('이메일을 입력해주세요.', '인증하기')}
            {inputContextWithButton('인증코드', '확인', '', styles.code)}
          </div>
        </div>
        <Button className={styles.okBtn} onClick={checkInput}>
          <p>다음</p>
        </Button>
      </div>
    )
  }

  const page2 = () => {
    const checkInput = () => {
      setPage(3);
    }

    return (
      <div className={styles.page2}>
        <div className={styles.header}>
          <p className={styles.h1}>팀빌리지 이용에 필요한 상세 정보를 입력해주세요.</p>
          <p className={styles.h2}>서비스 이용에 가장 중요한 단계입니다. 신중히 선택해주세요.</p>
        </div>
        <div className={styles.form}>
          <div className={styles.nameForm}>
            <label>이름*</label>
            {inputContextWithButton('본명을 입력해주세요', 'Invisiable', styles.hideBtn)}
          </div>
          <div className={styles.idForm}>
            <label>ID*</label>
            {inputContextWithButton('직접입력', '중복확인')}
          </div>
          <div className={styles.pwForm}>
            <label>PW*</label>
            {inputContextWithButton('직접입력', 'Invisiable', styles.hideBtn, styles.pwInput)}
            {inputContextWithButton('다시 한번 입력해주세요', 'Invisiable', styles.hideBtn, styles.pwCheck)}
          </div>
        </div>
        <Button className={styles.okBtn} onClick={checkInput}>
          <p>다음</p>
        </Button>
      </div>
    )
  }

  const page3 = () => {
    return (
      <div className={styles.page3}>
        <div className={styles.header}>
          <p className={styles.h1}>회원가입이 완료되었습니다!</p>
          <p className={styles.h2}>서비스 이용을 원하신다면 로그인을 해주세요.</p>
        </div>
        <Link to='/login'>
          <Button className={styles.okBtn}>
            <p>로그인</p>
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.signup}>
        <div className={styles.header}>
          {header()}
        </div>
        <div className={styles.content}>
          {carousel(page)}
          {(page === 1) ? page1() : ((page === 2) ? page2() : page3())}
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  )
}

export default Signup;