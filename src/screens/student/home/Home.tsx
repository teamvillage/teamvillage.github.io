import { useEffect, useState } from 'react';
import Base from '../base/Base';
import styles from './home.module.scss';
import { RootState } from '../../../store';
import { ITeamInfo } from '../../../store/slices/teamSlice';

import Tanagement from './modules/tanagement/Tanagement';
import Meeting from './modules/meeting/Meeting';
import Report from './modules/report/Report';
import TeamTask from './modules/teamTask/TeamTask';
import MyTask from './modules/myTask/MyTask';
import Achievement from './modules/achievement/Achievement';
import { useSelector } from 'react-redux';

function Home() {
  const [currentTeam, setCurrentTeam] = useState<ITeamInfo|null>(null);
  const [content, setContent] = useState(<></>);
  
  useEffect(() => {
    const tanagement_log = localStorage.getItem('tanagement');
    console.log(tanagement_log)
    if (tanagement_log === null)
      setContent(<Tanagement />)
    else {
      setContent(mainPage);
    }
  }, []);

  const mainPage = (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.meeting}>
          <Meeting 
            title="회의 with AI"
            meetings={currentTeam?.reports} />
        </div>
        <div className={styles.report}>
          <Report />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.teamTask}>
          <TeamTask />
        </div>
        <div className={styles.myTask}>
          <MyTask />
        </div>
        <div className={styles.achievement}>
          <Achievement />
        </div>
      </div>
    </div>
  )

  return (
    <Base onSelectTeam={(team: ITeamInfo) => {setCurrentTeam(team);}}>
      {content}
    </Base>
  )
}

export default Home;