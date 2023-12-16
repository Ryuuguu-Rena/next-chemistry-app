import styles from '@/app/home.module.css'
import Image from 'next/image'

export default function ReagentPlace() {
  return (
    <div className={styles.reagentPlace}>
      <Image
        src="/svg/plus.svg" 
        className={styles.reagentPlus}
        height={144}
        width={144}
        alt="add reagent"
      />
    </div>
  )
}