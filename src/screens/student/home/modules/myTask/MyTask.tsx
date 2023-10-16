import styles from './mytask.module.scss';
import { TeamInfo, updateTodo } from '../../../../../store/slices/teamSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import mytaskIcon from './mytaskIcon.png';
import mytaskClearIcon from './mytaskClearIcon.png';

interface Props {
  teamInfo: TeamInfo | undefined;
}

export default function MyTask({teamInfo}: Props) {
  const moment = require('moment');
  const me = useSelector((state: RootState) => state.user.user);
  const myTasks = teamInfo?.reports.map(report => 
    report.todos.filter(todo => todo.user.isEqual(me)))
    .flat()
    .sort((a, b) => {
      if (a.state == b.state) {
        if (a.importance == b.importance)
          return moment(a.due).diff(moment(b.due));
        else
          return a.importance - b.importance;
      }
      else 
        return Number(a.state) - Number(b.state);
    });

  return (
    <div className={styles.shadow}>
      <div className={styles.mytask}>
        <div className={styles.header}>
          <img src={mytaskIcon} alt='logo' />
          <p>팀 태스크</p>
        </div>
        <div className={styles.content}>
          {myTasks?.map((e, i) => {
            let dday = moment().diff(moment(e?.due), 'days');
            if (dday > 0)
              dday = '+' + dday;

            return (
              <div className={`${styles.task} 
                              ${e.importance < 0 ? styles.import : ''}
                              ${e.state ? styles.clear : ''}`} key={i}>
                <div className={styles.emoji}>
                  <img src={e.state ? mytaskClearIcon : mytaskIcon} alt='user'/>
                </div>
                <p className={styles.title}>{e.title}</p>
                <p className={styles.due}>{moment(e.due).format('MM.DD')}</p>
                <div className={styles.dday}>
                  <p>D{dday}</p>
                </div>
                <input
                  type='checkbox' 
                  id={'mytaskCheckbox' + i} />
                <label htmlFor={'mytaskCheckbox' + i} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
