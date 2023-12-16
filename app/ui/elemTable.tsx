import styles from '@/app/home.module.css'
import chemElems from '@/app/json/chemElems.json'
import { ChemElem, EmptyCell, MarkupCell } from '@/app/lib/definitions'
import Elem from '@/app/ui/tableElems/elem'
import Markup from '@/app/ui/tableElems/markup'
import Empty from '@/app/ui/tableElems/empty'

export default function ElemTable() {
  return (
  <div className={styles.elemsTableShadow}>
    <div className={styles.elemsTable}>
      {chemElems.map((elem) => {
        if (elem.type == 'elem'){
          return (
            <Elem key={elem.id} elem={elem as ChemElem}/>
          )
        }
        else if (elem.type == 'markup'){
          return (
            <Markup key={elem.id} elem={elem as MarkupCell}/>
          )
        }
        else{
          return (
            <Empty key={elem.id} elem={elem as EmptyCell}/>
          )
        }
      })}
      <div className={styles.elem}></div>
    </div>
  </div>
  )
}