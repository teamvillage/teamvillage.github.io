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
  const tanagement_log = localStorage.getItem('tanagement');

  return (
    <Base onSelectTeam={(team: ITeamInfo|null) => {setCurrentTeam(team);}}>
      {(tanagement_log === null) ? <Tanagement /> : 
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.meeting}>
            <Meeting 
              title="회의 with AI"
              meetings={currentTeam?.reports} />
          </div>
          <div className={styles.report}>
            <Report 
              reports={currentTeam?.reports} />
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
      }
    </Base>
  )
}

export default Home;