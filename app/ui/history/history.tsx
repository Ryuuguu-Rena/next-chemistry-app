import styles from './history.module.css'
import { Reaction } from '@/app/lib/definitions'
import Image from 'next/image'

export default function History({ 
  reactionsHistory, historyVisible, setHistoryVisible
} : { 
  reactionsHistory: Reaction[], historyVisible: boolean, setHistoryVisible: React.MouseEventHandler
}) {
  return(
    <div className={styles.shadow + ' ' + (historyVisible ? '' : 'hidden')}>
      <Image 
        src='/svg/cross.svg'
        className={styles.cross}
        width={50}
        height={50}
        alt='Закрыть'
        onClick={setHistoryVisible}
      />
      <div className={styles.modalWindow}>
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
                    return reag
                  return reag + ' + '
                })} → 
                {reaction.products.map((prod, i, arr) => {
                  if (i == arr.length - 1)
                    return prod
                  return prod + ' + '
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