import styles from '@/app/home.module.css'
import Image from 'next/image'
import { Reagent } from '../lib/definitions'
import { useState } from 'react'

export default function ReagentPlace({
  setReagent, value, deleteReagent
} : {
  setReagent?: Function, value?: Reagent, deleteReagent?: Function
}) {
  let [isHovered, setHover] = useState(false);
  let getCurrentSign = () => {
    if (setReagent)
      setReagent(value)
  }
  return (
    <div className={styles.reagentPlace} onClick={getCurrentSign}>
      {value ?
        <>
          <div 
            className={styles.placeSign}
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
          >
            {(value as Reagent).sign}
            <div 
              className={(deleteReagent && isHovered ? styles.delete : styles.hidden)}
              onClick={(event) => {
                deleteReagent && deleteReagent(value);
                event.stopPropagation()
              }}
            >
              <Image
                src='/svg/delete.svg'
                className={styles.deleteImg}
                height={50}
                width={50}  
                alt='удалить реагент'
              />
            </div>
          </div>
        </>
      :
        <Image
          src='/svg/plus.svg'
          className={styles.reagentPlus}
          height={144}
          width={144}
          alt='добавить реагент'
        />
      }
    </div>
  )
}