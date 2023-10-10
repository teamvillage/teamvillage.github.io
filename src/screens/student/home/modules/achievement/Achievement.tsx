import styles from './achievement.module.scss';
import achievement from './temp_achievement.png';

export default function Achievement() {
  return (
    <div className={styles.teamtask}>
      <img src={achievement} />
    </div>
  )
}