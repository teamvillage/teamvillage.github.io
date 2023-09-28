import { useState } from 'react';
import { ITeamInfo } from '../../../store/slices/teamSlice';
import styles from './startMeeting.module.scss';
import { useInterval } from '../../../components';

interface Prop {
  team: ITeamInfo;
}

export default function StartMeeting({team}: Prop) {
  const moment = require('moment');
  const [restTime, setRestTime] = useState("00:00:00");

  const isReportExist = team.reports.length > 0 && team.reports.filter(report => moment().diff(moment(report.startTime)) < 0).length !== 0;

  const targetReport = moment(
    team.reports
      ?.filter(report => moment().diff(moment(report.startTime)) < 0)
      .sort((a, b) => moment(a.startTime).isBefore(moment(b.startTime)))[0]
      .startTime
  );
  
  useInterval(() => {
    let ms = targetReport.diff(moment());
    let d = moment.duration(ms);
    let str = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    setRestTime(str);
  }, 1000);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <p>회의 시작</p>
        <p>with AI</p>
      </div>
      <div className={styles.info}>
        <div className={styles.members}>
          {team.users.map((user, idx) => (
            <div className={styles.memberWrapper}>
              <img className={styles.userEmoji} src={user.emoji} alt='user' key={idx} />
            </div>
          ))}
        </div>
        <div className={styles.meeting}>
          <div className={styles.time}>
            {isReportExist && <p>-{restTime}</p>}
          </div>
          <div className={styles.startBtn}>
            <p>회의 시작</p>
          </div>
        </div>
      </div>
    </div>
  )
}