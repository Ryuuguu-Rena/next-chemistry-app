import styles from '@/app/home.module.css'
import Image from 'next/image'
import { ChemElem, isChemElem } from '../lib/definitions'

export default function ReagentPlace({
  onClick, value
} : {
  onClick?: Function, value?: ChemElem | string
}) {
  let getCurrentSign = () => {
    if (onClick)
      onClick(value)
  }
  return (
    <div className={styles.reagentPlace} onClick={getCurrentSign}>
      {value && isChemElem(value as ChemElem) ? 
        <div className={styles.placeSign}>{(value as ChemElem).sign}</div>
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