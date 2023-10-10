import styles from './meeting.module.scss';
import meeting from './temp_meeting.png';

export default function Meeting() {
  return (
    <div className={styles.meeting}>
      <img src={meeting} />
    </div>
  )
}