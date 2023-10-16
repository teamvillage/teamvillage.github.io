import styles from './achievement.module.scss';
import infoIcon from './infoIcon.png';
import completeImage from './complete.png';
import { TeamInfo } from '../../../../../store/slices/teamSlice';

interface Props {
  teamInfo: TeamInfo | undefined;
}

export default function Achievement({teamInfo}: Props) {
  return (
    <div className={styles.shadow}>
      <div className={styles.achievement}>
        <div className={styles.top}>
          <p>기준달성도</p>
          <img src={infoIcon} alt='info' />
        </div>
        {teamInfo && 
        <div className={styles.bottom}>
          <div className={styles.content}>
            <div className={`${styles.achieveContent} ${styles.active}`}>
              <div className={styles.title}>
                <p>완성도</p>
              </div>
              <p>우리의 완성도는 '완료'이다.</p>
            </div>
            <div className={styles.achieveContent}>
              <div className={styles.title}>
                <p>성실성</p>
              </div>
              <p>9시 1분은 9시가 아니다.</p>
            </div>
            <div className={styles.achieveContent}>
              <div className={styles.title}>
                <p>적극성</p>
              </div>
              <p>실패해도 좋아. 아이디어 많이 내기!</p>
            </div>
            <div className={styles.achieveContent}>
              <div className={styles.title}>
                <p>협&nbsp;&nbsp;력</p>
              </div>
              <p>연락 두절을 비롯한 모든 잠수 행위</p>
            </div>
            <div className={styles.achieveContent}>
              <div className={styles.title}>
                <p>존&nbsp;&nbsp;중</p>
              </div>
              <p>상대의 의견을 경청합시다.</p>
            </div>
          </div>
          <img src={completeImage} alt='image' />
        </div>
      }
      </div>
    </div>
  )
}