import styles from './history.module.css'
import homeStyles from '@/app/home.module.css'
import { Reaction } from '@/app/lib/definitions'
import Image from 'next/image'

export default function History({ 
  reactionsHistory, visible, hide
} : { 
  reactionsHistory: Reaction[], visible: boolean, hide: React.MouseEventHandler
}) {
  return(
    <div 
      className={homeStyles.shadow + ' ' + (visible ? '' : homeStyles.hidden)}
      onClick={hide}
    >
      <Image 
        src='/svg/cross.svg'
        className={homeStyles.cross}
        width={50}
        height={50}
        alt='Закрыть'
      />
      <div className={homeStyles.modalWindow} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>История реакций</div>
        <div className={styles.reactionsList}>
        {reactionsHistory.length == 0 ?
          <div className={styles.noReactions}>
            История реакций пуста
          </div>
          : reactionsHistory.map((reaction, i) => {
            return(
              <div key={i} className={styles.reaction}>
                {reaction.reagents.map((reag, i, arr) => {
                  if (i == arr.length - 1)
                    return reag.sign
                  return reag.sign + ' + '
                })} → 
                {reaction.products.map((prod, i, arr) => {
                  if (i == arr.length - 1)
                    return ' ' + prod.sign
                  return prod.sign + ' +'
                })}
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}