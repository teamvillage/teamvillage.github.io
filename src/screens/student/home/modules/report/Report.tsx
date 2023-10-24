import { Button } from '../../../../../components';
import { ReportInfo } from '../../../../../store/slices/teamSlice';
import styles from './report.module.scss';
import arrow from './rightarrow.svg';

interface Props {
  reports?: Array<ReportInfo>;
  onReportClick?: () => any;
}

export default function Report({reports, onReportClick}:Props) {
  const moment = require('moment');
  const sortedReports = reports
    ?.filter(report => moment(report.endTime).diff(moment(), 'seconds') < 0)
    .sort((a, b) => moment(b.startTime).diff(moment(a.startTime), 'seconds'))
    .slice(0, 4);

  const createCard = (data: ReportInfo) => {
    const moment = require('moment');
    const duration = moment(data.endTime).diff(moment(data.startTime), 'seconds')
    const taketimes = moment.utc(duration * 1000).format('HH:mm:ss');
    const keywords = data.keywords?.slice(0, 3);

    return (
      <Button className={styles.card} onClick={() => {
        if (onReportClick) onReportClick();
      }}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <p>{data.title}</p>
          </div>
          <div className={styles.cardTime}>
            <p>{moment(data.startTime).format('YYYY-MM-DD')} | {taketimes}</p>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardEmoji}>
            {data.users.map((user, i) => (
              <div className={styles.cardEmojiBackground} key={i}>
                <img src={user.emoji} alt='user' key={i} />
              </div>
            ))}
          </div>
          <div className={styles.cardKeywords}>
            {keywords?.map((e, i) => <p key={i}>{e}</p>)}
          </div>
        </div>
      </Button>
    )
  }

  return (
    <div className={styles.shadow}>
      <div className={styles.report}>
        <div className={styles.header}>
          <p className={styles.title}>회의 레포트</p>
          <Button className={styles.moreBtn}>
            <p>더보기 &nbsp;</p>
            <img src={arrow} alt='arrow' />
          </Button>
        </div>
        <div className={styles.content}>
          {sortedReports?.map((e, i) => <div key={i}>{createCard(e)}</div>)}
        </div>
      </div>
    </div>
  )
}