'use client'

import elemStyles from '@/app/ui/tableElems/elem.module.css'
import homeStyles from '@/app/home.module.css'
import elemCells from '@/app/json/elemCells.json'
import { ElemCell, EmptyCell, MarkupCell, Reagent } from '@/app/lib/definitions'
import Elem from '@/app/ui/tableElems/elem'
import Markup from '@/app/ui/tableElems/markup'
import Empty from '@/app/ui/tableElems/empty'
import Image from 'next/image'

export default function ElemTable({ 
  hide, visible, setReagent, swap
} : { 
  hide: Function, visible: boolean, setReagent: Function, swap: React.MouseEventHandler
}) {
  let selectedElem: string;
  let getElemSign = (event: React.MouseEvent) => {
    let target = event.target as HTMLDivElement | null; 
    if (target?.className.includes(elemStyles.elem))
      target = target
    else if (target?.parentElement?.className.includes(elemStyles.elem))
      target = target.parentElement as HTMLDivElement
    else if (target?.parentElement?.parentElement?.className.includes(elemStyles.elem))
      target = target.parentElement.parentElement as HTMLDivElement
    else 
      target = null

    if (target?.firstChild){
      selectedElem = (target.firstChild as HTMLDivElement).innerHTML;
      let tableSign = (elemCells.find(item => item.sign == selectedElem) as ElemCell);
      setReagent(({sign: tableSign.realSign, name: tableSign.name}) as Reagent);
      hide()
    }
  }
  return (
    <div 
      className={homeStyles.shadow + ' ' + (visible ? '' : homeStyles.hidden)} 
      onClick={hide as React.MouseEventHandler}
    >
      <Image 
        src='/svg/cross.svg'
        className={homeStyles.cross}
        width={50}
        height={50}
        alt='Закрыть'
      />
      <div className={homeStyles.arrowRight}>
        <Image 
          src='/svg/arrowRight.svg'
          width={100}
          height={100}
          alt='Перейти к таблице'
          onClick={swap}
        />
        <div className={homeStyles.arrowSign}>К списку</div>
      </div>
      <div 
        className={homeStyles.modalWindow + ' ' + elemStyles.elemsTable} 
        onClick={(event) => {getElemSign(event); event.stopPropagation()}}
      >
        {elemCells.map((elem, i) => {
          if (elem.type == 'elem') {
            return (
              <Elem key={i} elem={elem as ElemCell}/>
            )
          }
          else if (elem.type == 'markup') {
            return (
              <Markup key={i} elem={elem as MarkupCell}/>
            )
          }
          else {
            return (
              <Empty key={i} elem={elem as EmptyCell}/>
            )
          }
        })}
      </div>
    </div>
  )
}