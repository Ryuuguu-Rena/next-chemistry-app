'use client'

import styles from './home.module.css'
import ReagentPlace from '@/app/ui/reagentPlace'
import ElemTable from '@/app/ui/elemTable'
import { useState } from 'react'
import { Reaction, Reagent } from './lib/definitions'
import ReactionBtn from '@/app/ui/reactionBtn'
import ControlPanel from './ui/control/controlPanel'
import History from './ui/history/history'
import Settings from './ui/settings'
import ReagentPicker from './ui/reagentPicker/reagentPicker'

export default function Home() {
  let [tableVisible, setTableVisible] = useState(false);
  let [historyVisible, setHistoryVisible] = useState(false);
  let [reagentsPickerVisible, setReagentsPickerVisible] = useState(false);
  let [isWrongReaction, setWrongReaction] = useState(false);
  let [placedReagents, setPlacedReagents] = useState([] as Reagent[]); //возможно реверсивный порядок id
  let [currentReagent, setCurrentReagent] = useState(null as Reagent | null); //возможно стоит перенести в ReagentPlace
  let [discoveredReagents, setDiscoveredReagents] = useState([] as Reagent[]); //back
  let [reaction, setReaction] = useState(null as Reaction | null); 
  let [reactionsHistory, setReactionsHistory] = useState([] as Reaction[]); //back
  let updateHistory = (reaction: Reaction | undefined) => { //back
    if (reaction && !reactionsHistory.includes(reaction)){
      setReaction(reaction);
      reaction.products.forEach((reag) => {
        if (!discoveredReagents.includes(reag))
          discoveredReagents.push(reag)
      })
      setDiscoveredReagents(discoveredReagents);
      reactionsHistory.push(reaction); //back
      setReactionsHistory(reactionsHistory) //back
    }
  }
  let setReagent = (reagent: Reagent) => {
    if (currentReagent){
      placedReagents[placedReagents.indexOf(currentReagent)] = reagent;
      setPlacedReagents(placedReagents)
    }
    else{
      placedReagents.push(reagent);
      setPlacedReagents(placedReagents)
    }
  };
  let deleteReagent = (reagent: Reagent) => {    
    placedReagents.splice(placedReagents.indexOf(reagent), 1);
    setCurrentReagent(reagent);
    setPlacedReagents(placedReagents)
  }
  let showTable = (selectedReagent: Reagent | null) => {
    setWrongReaction(false)
    setReaction(null);
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
          <ReagentPlace setReagent={() => showTable(null)} />
          {placedReagents.map((reagent, i) => {
            return(
              <ReagentPlace
                key={i} 
                setReagent={(placedReagent: Reagent) => showTable(placedReagent)} 
                deleteReagent={(reag: Reagent) => deleteReagent(reag)}
                value={reagent} />
            )
          })}
          {placedReagents.length != 0 && 
            <ReactionBtn 
              reagents={placedReagents}
              startReaction={(reac: Reaction | undefined) => updateHistory(reac)} //back
              isWrongReaction={isWrongReaction}
              setWrongReaction={() => setWrongReaction(true)}
            />}
          {reaction?.products.map((product, i) => {
            return(
              <ReagentPlace 
                key={i}
                value={product}
              />
            )
          })}
        </div>
      </div>
      <Settings />
      <History
        reactionsHistory={reactionsHistory} //back
        visible={historyVisible}
        hide={() => setHistoryVisible(false)}
      />
      <ReagentPicker 
        reagents={discoveredReagents} //back       
        visible={reagentsPickerVisible}
        hide={() => setReagentsPickerVisible(false)}
        setReagent={(reagent: Reagent) => setReagent(reagent)}
        swap={() => setTableVisible(true)}
      />
      <ElemTable 
        visible={tableVisible} 
        hide={() => setTableVisible(false)} 
        setReagent={(reagent: Reagent) => setReagent(reagent)} 
        swap={() => setReagentsPickerVisible(true)}
      />
    </main>
  )
}