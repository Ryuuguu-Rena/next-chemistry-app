import styles from '@/app/home.module.css'
import Image from 'next/image'
import { Reagent } from '../lib/definitions'
import { arraysEqual } from '../lib/utils'

export default function ReactionBtn({ 
  startReaction, isWrongReaction
} : { 
  startReaction: Function, isWrongReaction: Boolean
}) {
  
  return(
    <div className={styles.startReaction} onClick={startReaction as React.MouseEventHandler}>
      <Image 
        src={isWrongReaction ? '/svg/wrongReaction.svg' : '/svg/startReaction.svg'}
        className={styles.startReaction}
        width={144}
        height={144}
        alt='Start reaction'
      />
    </div>
  )
}