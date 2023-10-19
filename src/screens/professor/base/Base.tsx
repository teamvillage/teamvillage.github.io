import styles from './base.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { assetType, loadAsset } from '../../../utils/AssetController';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';
import { ClassInfo } from '../../../store/slices/classSlice';

interface Props {
  onSelectClass?: (cls: ClassInfo) => any;
  onAddClass?: () => any;
}

function Base({children, onSelectClass, onAddClass}: PropsWithChildren<Props>) {
  const [logoImage, setLogoImage] = useState('');
  const [selectedClassIdx, setClassIdx] = useState(0);

  useEffect(() => {
    loadAsset('logo_long.png', assetType.image)
      .then(img => setLogoImage(img.default));
  }, []);

  const classList = useSelector((state: RootState) => state.class.classList);
  const me = useSelector((state: RootState) => state.user.user);

  const changeClass = (idx: number) => { setClassIdx(idx); }
  useEffect(() => {
    if (onSelectClass)
    onSelectClass(classList[selectedClassIdx]);
  }, [selectedClassIdx]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to='/professor'>
          <div className={styles.logo}>
            <img src={logoImage} />
          </div>
        </Link>
          <div className={styles.teams}>
            {classList.length !== 0 &&
            <div className={styles.teamList}>
              {classList.map((classInfo, idx) => 
              <Button className={`
                ${styles.teamName} 
                ${selectedClassIdx == idx ? styles.selected : ''}`
              } key={idx} onClick={(_) => changeClass(idx)}>
                <p>0{classInfo.number} | {classInfo.name}</p>
              </Button>
              )}
            </div>
            }
            <Button className={styles.addTeam} onClick={onAddClass}>
              <p>+</p>
              {classList.length === 0 &&
              <p>새로운 과목 추가</p>}
            </Button>
          </div>
        <div className={styles.users}>
          {classList.length !== 0 &&
          <div className={styles.classNumber}>
            <p>과목코드 | {`${classList[selectedClassIdx].code}-${classList[selectedClassIdx].number}`}</p>
          </div>
          }
          <Link to={'/'}>
            <Button className={`${styles.userEmoji} ${styles.myEmoji}`}>
              <img src={me.emoji} alt='userEmoji' />
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Base;
