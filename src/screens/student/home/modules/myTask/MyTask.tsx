import styles from './mytask.module.scss';
import myTask from './temp_mytask.png';

export default function MyTask() {
  return (
    <div className={styles.myTask}>
      <img src={myTask} />
    </div>
  )
}