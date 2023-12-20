import styles from '@/app/home.module.css'
import Image from 'next/image'
import reactions from '@/app/json/reactions.json' //back
import { Reagent } from '../lib/definitions'
import { arraysEqual } from '../lib/utils'

export default function ReactionBtn({ 
  reagents, startReaction, isWrongReaction, setWrongReaction
} : { 
  reagents: Reagent[], startReaction: Function, isWrongReaction: Boolean, setWrongReaction: Function
}) {
  let getReaction = () => { 
    if (reagents.length == 0){
      setWrongReaction();
      return
    }
    let reaction = reactions.find((reac) => //back получить реакцию + запись в историю
      arraysEqual(reac.reagents.map((reag) => reag.sign), reagents.map((reag) => reag.sign)))
    if (!reaction)
      setWrongReaction()
    startReaction(reaction)
  }
  return(
    <div className={styles.startReaction} onClick={getReaction}>
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