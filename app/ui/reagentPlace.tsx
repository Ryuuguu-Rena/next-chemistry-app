import styles from '@/app/home.module.css'
import Image from 'next/image'
import { ChemElem } from '../lib/definitions'

export default function ReagentPlace({
  onClick, value
} : {
  onClick?: Function, value?: ChemElem
}) {
  let getCurrentSign = () => {
    if (onClick)
      onClick(value)
  }
  return (
    <div className={styles.reagentPlace} onClick={getCurrentSign}>
      {value ? 
        <div className={styles.placeSign}>{value.sign}</div>
         :
        <Image
          src='/svg/plus.svg'
          className={styles.reagentPlus}
          height={144}
          width={144}
          alt='add reagent'
        />}
    </div>
  )
}