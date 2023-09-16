import { PropsWithChildren, ReactElement } from 'react';
import styles from './base.module.scss';
import noticeActive from '../../../assets/images/noticeActive.svg';
import { IUserInfo } from '../../../store/slices/userSlice';

interface Props {
  header?: ReactElement;
  user: IUserInfo;
}

function Base({children, header, user}: PropsWithChildren<Props>) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p>팀빌리지</p>
        </div>
        <div className={styles.propHeader}>
          {header}
        </div>
        <div className={styles.personalInfo}>
          <div className={styles.alert}>
            <img src={noticeActive} alt='alert' />
          </div>
          <div className={styles.person}>
            <img src={user.emoji} alt='user' />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

export default Base;