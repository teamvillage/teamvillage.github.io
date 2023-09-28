import { useState } from 'react';
import Base from '../base/Base';
import styles from './home.module.scss';
import { ITeamInfo } from '../../../store/slices/teamSlice';

import Tanagement from './modules/tanagement/Tanagement';

function Home() {
  const [currentTeam, setCurrentTeam] = useState({});


  return (
    <Base onSelectTeam={(team: ITeamInfo) => {setCurrentTeam(team);}}>
      <Tanagement />
    </Base>
  )
}

export default Home;