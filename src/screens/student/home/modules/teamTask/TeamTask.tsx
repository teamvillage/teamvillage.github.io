import styles from './teamtask.module.scss';
import teamTask from './temp_teamtask.png';

export default function TeamTask() {
  return (
    <div className={styles.teamtask}>
      <img src={teamTask} />
    </div>
  )
}