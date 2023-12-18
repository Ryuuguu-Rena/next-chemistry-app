import styles from '@/app/ui/tableElems/elem.module.css'
import { MarkupCell } from '@/app/lib/definitions'

export default function Markup({ elem } : { elem: MarkupCell }) {
  return(
    <div
    className={styles.markup + ' ' + elem.span}
    >
      <div className={styles.markupCont}>
        {elem.content}
      </div>
    </div>
  )
}