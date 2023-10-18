import { useDispatch, useSelector } from 'react-redux';
import { TeamInfo, updateTodo } from '../../../../../store/slices/teamSlice';
import styles from './teamtask.module.scss';
import teamTaskIcon from './teamTaskIcon.png';
import { RootState } from '../../../../../store';
import { useEffect, useRef } from 'react';
import { Button } from '../../../../../components';

interface Props {
  teamInfo: TeamInfo | undefined;
}

export default function TeamTask({teamInfo}: Props) {
  const moment = require('moment');
  const me = useSelector((state: RootState) => state.user.user);
  const teamTasks = teamInfo?.reports.map(report => 
    report.todos?.filter(todo => !todo.user.isEqual(me)))
    .flat()
    .sort((a, b) => moment(a?.due).diff(moment(b?.due)));
  const checkboxRefs = useRef<Array<HTMLInputElement | null>>([]);
  const dispatch = useDispatch();

  return (
    <div className={styles.shadow}>
      <div className={styles.teamtask}>
        <div className={styles.header}>
          <img src={teamTaskIcon} alt='logo' />
          <p>팀 태스크</p>
        </div>
        <div className={styles.content}>
          {teamTasks?.map((e, i) => {
            let dday = moment().diff(moment(e?.due), 'days');
            if (dday > 0)
              dday = '+' + dday;

            return (
              <div className={`${styles.task} 
                ${e.importance < 0 ? styles.import : ''}
                ${e.state ? styles.clear : ''}`} key={i}>
                <div className={styles.emoji}>
                  <img src={e.user.emoji} alt='user'/>
                </div>
                <p className={styles.title}>{e.title}</p>
                <p className={styles.due}>{moment(e.due).format('MM.DD')}</p>
                <div className={styles.dday}>
                  <p>D{dday}</p>
                </div>
                <input 
                  type='checkbox' 
                  id={'teamtaskCheckbox' + i} 
                  ref={e => checkboxRefs.current[i] = e}
                  onChange={({target: {checked}}) => {
                    dispatch(updateTodo([teamInfo, e, checked]))
                  }}
                  checked={e.state} />
                  <label htmlFor={'teamtaskCheckbox' + i} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}