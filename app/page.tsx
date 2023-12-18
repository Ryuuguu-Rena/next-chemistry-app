'use client'

import styles from './home.module.css'
import ReagentPlace from '@/app/ui/reagentPlace'
import ElemTable from '@/app/ui/elemTable'
import { useState } from 'react'
import { ChemElem } from './lib/definitions'
import Reaction from './ui/startReaction'

export default function Home() {
  let [tableVisible, setVisible] = useState(false);
  let [placedReagents, setPlacedReagents] = useState([] as ChemElem[]);
  let [currentReagent, setCurrentReagent] = useState(null as ChemElem | null);
  let [resultReagents, setResultReagents] = useState([] as ChemElem[]);
  let setReagent = (reagent: ChemElem) => {
    if (currentReagent){
      placedReagents[placedReagents.indexOf(currentReagent)] = reagent;
      setPlacedReagents(placedReagents)
    }
    else
      setPlacedReagents([...placedReagents, reagent])
  };
  let showTable = (selectedReagent: ChemElem | null) => {
    setCurrentReagent(selectedReagent);
    setVisible(true)
  };
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.reagents}>
          <ReagentPlace onClick={() => showTable(null)} />
          {placedReagents.map((reagent, i) => {
            return(
              <ReagentPlace 
                key={i} 
                onClick={(placedReagent: ChemElem) => showTable(placedReagent)} 
                value={reagent} />
            )
          })}
          {placedReagents.length != 0 && 
            <Reaction 
              reagents={placedReagents}
              startReaction={(reagents: ChemElem[]) => setResultReagents(reagents)}
            />}
          {resultReagents.map((reagent, i) => {
            return(
              <ReagentPlace 
                key={i}
                value={reagent}
              />
            )
          })
          }
        </div>
      </div>
      <ElemTable 
        visible={tableVisible} 
        hideTable={() => setVisible(false)} 
        setReagent={(reagent: ChemElem) => setReagent(reagent)} 
      />
    </main>
  )
}