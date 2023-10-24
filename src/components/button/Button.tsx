import { CSSProperties, MouseEventHandler, PropsWithChildren, useState } from "react"
import styles from './button.module.css';

interface Props {
  style?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  effectOff?: boolean;
}

function Button({children, style={}, className='', onClick=undefined, effectOff=false}: PropsWithChildren<Props>) {
  const [isClicked, setIsClicked] = useState(false);

  const clickAction = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div className={`${isClicked && !effectOff ? styles.clicked : ''} ${styles.customButton} ${className}`} style={style} onMouseDown={clickAction} onMouseUp={clickAction} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button;