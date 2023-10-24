import styles from './base.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { assetType, loadAsset } from '../../../utils/AssetController';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';
import { TeamInfo } from '../../../store/slices/teamSlice';
import backIcon from './backIcon.png';

interface Props {
  onSelectTeam?: (team: TeamInfo) => any;
  onAddTeam?: () => any;
  customHeader?: ReactNode;
  isBackExist?: boolean;
  backHandler?: () => any;
}

function Base({children, onSelectTeam, onAddTeam, customHeader, isBackExist=false, backHandler}: PropsWithChildren<Props>) {
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
  const me = useSelector((state: RootState) => state.user.user);
  const teamUsers = teamList.length == 0 ? [] : teamList[selectedTeamIdx].users;

  const changeTeam = (idx: number) => { setTeamIdx(idx); }
  useEffect(() => {
    if (onSelectTeam)
      onSelectTeam(teamList[selectedTeamIdx]);
  }, [selectedTeamIdx]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to='/student'>
          <div className={styles.logo}>
            {isBackExist && 
            <Button className={styles.back} onClick={() => {backHandler!();}}>
              <img src={backIcon} />
            </Button>
            }
            <img src={logoImage} />
          </div>
        </Link>
        {customHeader == undefined ?
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
            <Button className={styles.addTeam} onClick={onAddTeam}>
              <p>+</p>
              {teamList.length === 0 &&
              <p>새로운 과목 추가</p>}
            </Button>
          </div>
          :
          customHeader
        }
        <div className={styles.users}>
          {teamUsers.length !== 0 &&
          teamUsers.map((user, idx) => {
            if (!user.isEqual(me))
              return (
              <Button className={styles.userEmoji} key={idx}>
                <img src={user.emoji} alt='userEmoji' />
              </Button>
          )})}
          <Link to={'/'} onClick={() => {localStorage.clear()}}>
            <Button className={`${styles.userEmoji} ${styles.myEmoji}`}>
              <img src={me.emoji} alt='userEmoji' />
            </Button>
          </Link>
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
