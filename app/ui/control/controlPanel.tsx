import styles from './control.module.css'
import Image from 'next/image'
import { fetchReagents } from '@/app/lib/data'

export default function ControlPanel({ 
  setHistoryVisible 
} : { 
  setHistoryVisible: React.MouseEventHandler 
}) {
  return(
    <div className={styles.container}>
      <div 
        className={styles.history}
        onClick={setHistoryVisible}
      >
        История
      </div>
      <Image 
        src='/svg/settings.svg'
        width={80}
        height={80}
        alt='Настройка'
      />
    </div>
  )
}