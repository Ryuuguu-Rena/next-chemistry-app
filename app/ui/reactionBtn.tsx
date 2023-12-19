import styles from '@/app/home.module.css'
import Image from 'next/image'
import reactions from '@/app/json/reactions.json'
import { ElemCell } from '../lib/definitions'
import { arraysEqual } from '../lib/utils'

export default function ReactionBtn({ 
  reagents, startReaction 
} : { 
  reagents: ElemCell[], startReaction: Function 
}) {
  let getReaction = () => {    
    let reaction = reactions.find((reac) => 
      arraysEqual(reac.reagents, reagents.map((reagent) => reagent.sign)))
    startReaction(reaction);
  }
  return(
    <div className={styles.startReaction} onClick={getReaction}>
      <Image 
        src='/svg/startReaction.svg'
        className={styles.startReaction}
        width={144}
        height={144}
        alt='Start reaction'
      />
    </div>
  )
}