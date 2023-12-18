'use client'

import styles from './home.module.css'
import ReagentPlace from '@/app/ui/reagentPlace'
import ElemTable from '@/app/ui/elemTable'
import { useState } from 'react'
import { ChemElem, Reaction } from './lib/definitions'
import ReactionBtn from '@/app/ui/reactionBtn'
import ControlPanel from './ui/control/controlPanel'
import History from './ui/history/history'
import Settings from './ui/settings'

export default function Home() {
  let [tableVisible, setTableVisible] = useState(false);
  let [historyVisible, setHistoryVisible] = useState(false);
  let [placedReagents, setPlacedReagents] = useState([] as ChemElem[]);
  let [currentReagent, setCurrentReagent] = useState(null as ChemElem | null);
  let [reaction, setReaction] = useState(null as Reaction | null);
  let [reactionsHistory, setReactionsHistory] = useState([] as Reaction[]);
  let updateHistory = (reaction: Reaction | undefined) => {
    if (reaction){
      setReaction(reaction);
      reactionsHistory.push(reaction);
      setReactionsHistory(reactionsHistory)
    }
  }
  let setReagent = (reagent: ChemElem) => {
    if (currentReagent){
      placedReagents[placedReagents.indexOf(currentReagent)] = reagent;
      setPlacedReagents(placedReagents)
    }
    else{
      placedReagents.push(reagent);
      setPlacedReagents(placedReagents)
    }
  };
  let showTable = (selectedReagent: ChemElem | null) => {
    setCurrentReagent(selectedReagent);
    setTableVisible(true)
  };
  return (
    <main>
      <div className={styles.container}>
        <ControlPanel 
          setHistoryVisible={() => setHistoryVisible(true)}
        />
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
            <ReactionBtn 
              reagents={placedReagents}
              startReaction={(reac: Reaction | undefined) => updateHistory(reac)}
            />}
          {reaction?.products.map((product, i) => {
            return(
              <ReagentPlace 
                key={i}
                value={product}
              />
            )
          })
          }
        </div>
      </div>
      <Settings />
      <History 
        reactionsHistory={reactionsHistory} 
        historyVisible={historyVisible}
        setHistoryVisible={() => setHistoryVisible(false)}
      />
      <ElemTable 
        visible={tableVisible} 
        hideTable={() => setTableVisible(false)} 
        setReagent={(reagent: ChemElem) => setReagent(reagent)} 
      />
    </main>
  )
}