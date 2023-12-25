import Image from 'next/image'
import styles from '../history/history.module.css'
import homeStyles from '@/app/home.module.css'
import { Reagent } from '@/app/lib/definitions'


export default function ReagentPicker({
  reagents, visible, hide, setReagent, swap
}: {
  reagents: Reagent[], visible: boolean, hide: Function, setReagent: Function, swap: React.MouseEventHandler
}) {
  let getReagSign = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement;
    if (target.className.includes(styles.reaction)){
      let [sign, name] = target.innerHTML.split(' - ');
      setReagent({sign: sign, name: name} as Reagent);
      hide()
    }
  }
  return(
    <div 
      className={homeStyles.shadow + ' ' + (visible ? '' : 'hidden')} 
      onClick={hide as React.MouseEventHandler}
    >
      <Image 
        src='/svg/cross.svg'
        className={homeStyles.cross}
        width={50}
        height={50}
        alt='Закрыть'
      />
      <div className={homeStyles.arrowLeft}>
        <Image 
          src='/svg/arrowLeft.svg'
          width={100}
          height={100}
          alt='Перейти к таблице'
          onClick={swap}
        />
        <div className={homeStyles.arrowSign}>К таблице</div>
      </div>
      <div className={homeStyles.modalWindow} onClick={(event) => event.stopPropagation()}>
      <div className={styles.header}>Открытые элементы</div>
        <div className={styles.reactionsList} onClick={getReagSign}>
          {reagents.length == 0 ?
            <div className={styles.noReactions}>
              Нет ещё открытых реакций
            </div>
            : reagents.map((reag, i) => {
              return(
                <div key={i} className={styles.reaction}>
                  {reag.sign + ' - ' + reag.name}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}