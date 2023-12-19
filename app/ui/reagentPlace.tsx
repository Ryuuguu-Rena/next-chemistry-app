import styles from '@/app/home.module.css'
import Image from 'next/image'
import { ElemCell, isElemCell } from '../lib/definitions'

export default function ReagentPlace({
  onClick, value
} : {
  onClick?: Function, value?: ElemCell | string
}) {
  let getCurrentSign = () => {
    if (onClick)
      onClick(value)
  }
  return (
    <div className={styles.reagentPlace} onClick={getCurrentSign}>
      {value && isElemCell(value as ElemCell) ? 
        <div className={styles.placeSign}>{(value as ElemCell).sign}</div>
        : typeof(value) == 'string' ?
        <div className={styles.placeSign}>{value}</div>
         :
         <Image
           src='/svg/plus.svg'
           className={styles.reagentPlus}
           height={144}
           width={144}
           alt='add reagent'
         />

      }
    </div>
  )
}