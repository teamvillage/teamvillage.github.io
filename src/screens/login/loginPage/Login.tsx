import React from 'react';

import styles from './login.module.scss';
import callImage from '../../../assets/images/call.svg';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';

function Login() {
  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <p>WEGROW와 함께 완벽한 팀프로젝트를 경험해보세요!</p>
      </div>
      <div className={styles.login}>
        <div className={styles.title}>
          <span>팀빌리지</span>
        </div>
        <label className={styles.label}>로그인</label>
        <div className={styles.inputForm}>
          <input type='text'></input>
          <div>
            <label>ID</label>
          </div>
        </div>
        <div className={`${styles.inputForm} ${styles.password}`}>
          <input type='password'></input>
          <div>
            <label>PW</label>
          </div>
        </div>
        <div className={styles.keepLogin}>
          <input type='checkbox' id='keepLogin'></input>
          <label htmlFor='keepLogin'></label>
          <p>로그인 상태 유지</p>
        </div>
        <Link to={'/student'}>
          <Button className={styles.start}>
            <p>시작하기</p>
          </Button>
        </Link>
        <div className={`${styles.line1} ${styles.horizontalLine}`}></div>
        <div className={styles.additional}>
          <Link to='/signup'><p>회원가입</p></Link>
          <div className={`${styles.line2} ${styles.verticalLine}`}></div>
          <Link to='/findPassword'><p>비밀번호 찾기</p></Link>
        </div>
        <div className={styles.qna}>
          <div className={styles.customerCenter}>
            <img src={callImage} alt='callIcon'/>
            <p>고객센터 1670 - 0000</p>
          </div>
          <div className={`${styles.line3} ${styles.verticalLine}`}></div>
          <p className={styles.objection}>카카오톡 문의하기</p>
        </div>
        <p className={styles.info}>팀빌리지는 데스크톱 앱 다운로드를 권장합니다.</p>
        <p className={styles.download}>데스크톱 앱 다운로드</p>
      </div>
    </div>
  )
}

export default Login;