import styles from './addClass.module.scss';
import { loadAsset, assetType } from '../../../../../utils/AssetController';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../components';
import { ClassInfo } from '../../../../../store/slices/classSlice';

interface Prop {
  onComplete: (cls: ClassInfo) => any;
}

function AddClass({onComplete}: Prop) {
  const [logoIcon, setLogoIcon] = useState('');
  const [userscanIcon, setUserScanIcon] = useState('');
  const [chartIcon, setChartIcon] = useState('');
  const [groupIcon, setGroupIcon] = useState('');
  const [className, setClassName] = useState('');
  const [classNumber, setClassNumber] = useState(0);

  useEffect(() => {
    loadAsset('tanagement_home_icon.png', assetType.image)
      .then(image => setLogoIcon(image.default));
    loadAsset('userscan_icon.png', assetType.image)
      .then(image => setUserScanIcon(image.default));
    loadAsset('chart_icon.png', assetType.image)
      .then(image => setChartIcon(image.default));
    loadAsset('group_icon.png', assetType.image)
      .then(image => setGroupIcon(image.default));
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = (isPrev: boolean = false) => {
    if (isPrev) {
      setCurrentPage(currentPage - 1);
      return;
    }

    if (currentPage == pages.length - 1) {
      const newClass = new ClassInfo({
        name: className,
        number: classNumber
      });
      onComplete(newClass);
    }
    else
      setCurrentPage(currentPage + 1);
  }

  const instruction = (
    <div className={styles.instruction}>
      <div className={styles.icon}>
        <img src={logoIcon} alt='logo' />
      </div>
      <p className={styles.title}>
        새로운 과목 생성
      </p>
      <p className={styles.subtitle}>
        과목 생성으로 팀 관리에 더욱 최적화된 팀빌리지를 이용해보세요!
      </p>
      <div className={styles.content}>
        <div className={styles.search}>
          <img src={userscanIcon} alt='search' />
          <div>
            <p>학생들의 강점을</p>
            <p>바탕으로 팀생성</p>
          </div>
        </div>
        <div className={styles.check}>
          <img src={chartIcon} alt='check' />
          <div>
            <p>편리한 과제 확인 및</p>
            <p>동료평가 수치화</p>
          </div>
        </div>
        <div className={styles.flag}>
          <img src={groupIcon} alt='flag' />
          <div>
            <p>한눈에 볼 수 있는</p>
            <p>학생들의 협업공간</p>
          </div>
        </div>
      </div> 
      <Button className={styles.startTest} onClick={() => {
        nextPage();
      }}>
        <p>생성하기</p>
      </Button>
    </div>
  )

  const pages = [
    instruction,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {pages[currentPage]}
      </div>
    </div>
  )
}

export default AddClass;