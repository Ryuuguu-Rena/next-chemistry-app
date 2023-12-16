import styles from './home.module.css'
import ReagentPlace from '@/app/ui/reagentPlace'
import ElemTable from '@/app/ui/elemTable'

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.reagents}>
            <ReagentPlace />
        </div>
      </div>
    <ElemTable />
    </main>
  )
}
