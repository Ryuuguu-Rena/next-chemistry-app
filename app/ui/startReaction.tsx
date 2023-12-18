import styles from '@/app/home.module.css'
import Image from 'next/image'
import reactions from '@/app/json/reactions.json'
import { ChemElem } from '../lib/definitions'

export default function Reaction({ 
  reagents, startReaction 
} : { 
  reagents: ChemElem[], startReaction: Function 
}) {
  let getReaction = () => {
    ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //startReaction()
  }
  return(
    <div className={styles.startReaction} onClick={getReaction}>
      <Image 
        src='/svg/startReaction.svg'
        width={144}
        height={144}
        alt='Start reaction'
      />
    </div>
  )
}