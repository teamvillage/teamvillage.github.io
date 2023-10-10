import styles from './report.module.scss';
import report from './temp_report.png';

export default function Report() {
  return (
    <div className={styles.report}>
      <img src={report} />
    </div>
  )
}