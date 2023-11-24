import styles from './base.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { assetType, loadAsset } from '../../../utils/AssetController';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';
import { TeamInfo } from '../../../store/slices/teamSlice';
import backIcon from './backIcon.png';
import noticeImg from './notice_img.png';

import assignImg1 from './assign1.png';
import assignImg2 from './assign2.png';
import assignImg21 from './assign2-1.png';
import assignImg3 from './assign3.png';
import assignImg31 from './assign3-1.png';
import assignImg4 from './assign4.png';
import assignImg41 from './assign4-1.png';

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
  const [isNotice, setIsNotice] = useState(false);
  const [isAssign, setIsAssign] = useState(false);

  const changeTeam = (idx: number) => { setTeamIdx(idx); }
  useEffect(() => {
    if (onSelectTeam)
      onSelectTeam(teamList[selectedTeamIdx]);
  }, [selectedTeamIdx]);

  const [imgIdx, setImgIdx] = useState(0);
  const assignModal = () => {
    const imgList = [assignImg1, assignImg2, assignImg21, assignImg3, assignImg31, assignImg4, assignImg41];

    return (
      <div className={styles.modal}>
        <Button className={styles.assign} effectOff={true} onClick={() => {
          if (imgIdx == imgList.length - 1) {
            setImgIdx(0);
            setIsAssign(false);
          }
          else
            setImgIdx(imgIdx + 1);
        }}>
          <img src={imgList[imgIdx]} />
        </Button>
      </div>
    )
  }
  
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
          <Link to={'/'}>
            <Button className={`${styles.userEmoji} ${styles.myEmoji}`}>
              <img src={me.emoji} alt='userEmoji' />
            </Button>
          </Link>
          <Button className={styles.notice} onClick={() => setIsNotice(!isNotice)}>
            <img src={noticeImage} alt='noticeImage' />
          </Button>
          {isNotice && 
          <Button className={styles.noticeImg} onClick={() => setIsAssign(true)}>
            <img src={noticeImg} />
          </Button>}
        </div>
      </div>
      {isNotice &&
      <Button className={styles.noticeActivate} onClick={() => setIsNotice(false)}>
      </Button>
      }
      <div className={styles.content}>
        {children}
      </div>
      {isAssign && assignModal()}
    </div>
  )
}

export default Base;
