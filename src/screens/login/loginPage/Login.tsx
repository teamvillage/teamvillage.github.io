import { useEffect, useState } from 'react';
import { Link, useBeforeUnload } from 'react-router-dom';
import styles from './login.module.scss';
import { assetType, loadAsset } from '../../../utils/AssetController';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { setUser, defaultUsers, defaultProf } from '../../../store/slices/userSlice';

function Login() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const dispatch = useDispatch();
  const me = defaultUsers[0];
  const prof = defaultProf;
  
  useEffect(() => {
    loadAsset('logo_long.png', assetType.image)
      .then(img => setLogoImage(img.default));
    loadAsset('Background_login.png', assetType.image)
      .then(img => setBackgroundImage(img.default));
  }, []);

  function login(isStudent: boolean) {
    dispatch(setUser(isStudent ? me : prof));
  }

  return (
    <div className={styles.main}>
      <Link to={'/professor'} onClick={() => login(false)}>
        <div className={styles.background}>
          <img src={backgroundImage} alt='background' />
        </div>
      </Link>
      
      <div className={styles.login}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logoImage} alt="logo" />
          </div>
          <p className={styles.login_title}>로그인</p>
          <div className={styles.introduction}>
            <p>팀빌리지와 함께 완벽한</p>
            <p>팀프로젝트를 경험해보세요!</p>
          </div>
        </div>

        <div className={styles.form}>
          <Input label='ID' className='inputId' />
          <Input type='password' label='PW' className={styles.inputPw} />
          <div className={styles.keepLogin}>
            <input type='checkbox' id='keepLogin' />
            <label htmlFor='keepLogin'></label>
            <p>로그인 상태 유지</p>
          </div>

          <Link to={'/student'} onClick={() => login(true)}>
            <Button className={styles.start}>
              <p>로그인</p>
            </Button>
          </Link>
        </div>

        <div className={styles.info}>
          <div className={styles.horizontalLine}></div>
          <div className={styles.additional}>
            <Link to='/' onClick={() => localStorage.clear()}><p>아이디 찾기</p></Link>
            <div className={`${styles.verticalLine}`}></div>
            <Link to='/' onClick={() => localStorage.clear()}><p>비밀번호 찾기</p></Link>
            <div className={`${styles.verticalLine}`}></div>
            <Link to='/signup'><p>회원가입</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
