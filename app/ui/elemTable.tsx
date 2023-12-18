'use client'

import elemStyle from '@/app/ui/tableElems/elem.module.css'
import styles from '@/app/home.module.css'
import chemElems from '@/app/json/chemElems.json'
import { ChemElem, EmptyCell, MarkupCell } from '@/app/lib/definitions'
import Elem from '@/app/ui/tableElems/elem'
import Markup from '@/app/ui/tableElems/markup'
import Empty from '@/app/ui/tableElems/empty'

export default function ElemTable({ 
  hideTable, visible, setReagent
} : { 
  hideTable: Function, visible: boolean, setReagent: Function
}) {
  let selectedElem: string;
  let getElemSign = (e : React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLDivElement | null; 
    if (target?.className.includes(elemStyle.elem))
      target = target
    else if (target?.parentElement?.className.includes(elemStyle.elem))
      target = target.parentElement as HTMLDivElement
    else if (target?.parentElement?.parentElement?.className.includes(elemStyle.elem))
      target = target.parentElement.parentElement as HTMLDivElement
    else 
      target = null

    if (target?.firstChild){
      selectedElem = (target.firstChild as HTMLDivElement).innerHTML;
      setReagent(chemElems.find(item => item.sign == selectedElem));
      hideTable()
    }
  }
  return (
  <div className={styles.elemsTableShadow + ' ' + (visible ? '' : 'hidden')}>
    <div className={styles.elemsTable} onClick={getElemSign}>
      {chemElems.map((elem, i) => {
        if (elem.type == 'elem'){
          return (
            <Elem key={i} elem={elem as ChemElem}/>
          )
        }
        else if (elem.type == 'markup'){
          return (
            <Markup key={i} elem={elem as MarkupCell}/>
          )
        }
        else{
          return (
            <Empty key={i} elem={elem as EmptyCell}/>
          )
        }
      })}
      <div className={styles.elem}></div>
    </div>
  </div>
  )
}