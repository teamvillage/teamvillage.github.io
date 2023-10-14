import styles from './base.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { assetType, loadAsset } from '../../../utils/AssetController';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';
import { ITeamInfo } from '../../../store/slices/teamSlice';

interface Props {
  onSelectTeam?: (team: ITeamInfo|null) => any;
}

function Base({children, onSelectTeam=undefined}: PropsWithChildren<Props>) {
  const [logoImage, setLogoImage] = useState('');
  const [noticeImage, setNoticeImage] = useState('');
  const [selectedTeamIdx, setTeamIdx] = useState(0);

  useEffect(() => {
    loadAsset('logo_long.png', assetType.image)
      .then(img => setLogoImage(img.default));
    loadAsset('noticeActive.svg', assetType.image)
      .then(img => setNoticeImage(img.default));
  }, []);
  
  const teamList = useSelector((state: RootState) => state.team.teamList);
  const me = useSelector((state: RootState) => state.user.info);
  const teamUsers = teamList.length == 0 ? me : teamList[selectedTeamIdx].users;

  const changeTeam = (idx: number) => {
    setTeamIdx(idx);
  }
  useEffect(() => {
    if (onSelectTeam) {
      if (teamList.length == 0)
        onSelectTeam(null);
      else
        onSelectTeam(teamList[selectedTeamIdx]);
    }
  }, [selectedTeamIdx]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to='/student'>
          <div className={styles.logo}>
            <img src={logoImage} />
          </div>
        </Link>
        <div className={styles.teams}>
          {teamList.length !== 0 &&
          <div className={styles.teamList}>
            {teamList.map((teamInfo, idx) => 
            <Button className={`
              ${styles.teamName} 
              ${selectedTeamIdx == idx ? styles.selected : ''}`
            } key={idx} onClick={(_) => changeTeam(idx)}>
              <p>{teamInfo.name}</p>
            </Button>
            )}
          </div>
          }
          <Button className={styles.addTeam}>
            <p>+</p>
            {teamList.length === 0 &&
            <p>새로운 과목 추가</p>}
          </Button>
        </div>
        <div className={styles.users}>
          {teamUsers instanceof Array ?
          teamUsers.map((user, idx) => 
          <Button className={`
            ${styles.userEmoji}
            ${idx == teamUsers.length-1 ? styles.myEmoji : ''}`
          } key={idx}>
            <img src={user.emoji} alt='userEmoji' />
          </Button>)
          :
          <Button className={`${styles.userEmoji} ${styles.myEmoji}`}>
            <img src={teamUsers.emoji} alt='userEmoji' />
          </Button>
          }
          <Button className={styles.notice}>
            <img src={noticeImage} alt='noticeImage' />
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Base;