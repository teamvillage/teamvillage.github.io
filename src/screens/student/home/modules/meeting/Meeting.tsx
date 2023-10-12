import { useEffect, useState } from 'react';
import styles from './meeting.module.scss';
import { assetType, loadAsset } from '../../../../../utils/AssetController';
import { Button } from '../../../../../components';
import { IReportInfo } from '../../../../../store/slices/teamSlice';

interface Props {
  title: string;
  meetings?: Array<IReportInfo>;
}

export default function Meeting({title, meetings}:Props) {
  const moment = require('moment');

  const [cloverIcon, setCloverIcon] = useState('');
  const [isMeeting, setIsMeeting] = useState(false);
  const [isMeetExist, setIsMeetExist] = useState(false);

  let sortedMeets = meetings
    ?.filter(meet => moment(meet.endTime).diff(moment(), 'seconds') < 0)
    .sort((a, b) => moment(a.startTime).diff(moment(b.startTime), 'seconds'));

  useEffect(() => {
    if (sortedMeets && sortedMeets?.length > 0) {
      setIsMeetExist(true);
      if (moment(sortedMeets[0].startTime).diff(moment(), 'seconds') < 0)
        setIsMeeting(true);
    }

    loadAsset('clover_icon.svg', assetType.image)
      .then(img => setCloverIcon(img.default));
  }, []);

  return (
    <div className={styles.meeting}>
      <div className={styles.shadow}>
        <div className={styles.background}>
          <div className={styles.header}>
            <img src={cloverIcon} alt='logo' />
            <p>{title}</p>
          </div>
          <div className={styles.content}>
            <div className={styles.log}>
              {isMeetExist &&
              <></>
              }
            </div>
            <div className={styles.buttons}>
              <Button className={`${styles.reserve} ${styles.btn}`}>
                <p>예약하기</p>
              </Button>
              <Button className={`${styles.start} ${styles.btn}`}>
                <p>시작하기</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}