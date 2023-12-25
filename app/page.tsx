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
import { fetchReactions, fetchReagents, getProducts } from './lib/data'

export default function Home() {
  let [tableVisible, setTableVisible] = useState(false);
  let [historyVisible, setHistoryVisible] = useState(false);
  let [reagentsPickerVisible, setReagentsPickerVisible] = useState(false);
  let [isWrongReaction, setWrongReaction] = useState(false);
  let [placedReagents, setPlacedReagents] = useState([] as Reagent[]); //возможно реверсивный порядок id
  let [currentReagent, setCurrentReagent] = useState(null as Reagent | null); //возможно стоит перенести в ReagentPlace
  let [discoveredReagents, setDiscoveredReagents] = useState([] as Reagent[]); //back
  let [products, setProducts] = useState([] as Reagent[]); 
  let [reactionsHistory, setReactionsHistory] = useState([] as Reaction[]); //back
  let updateHistory = async () => { //back
      fetchReactions().then((result) => setReactionsHistory(result));
      setHistoryVisible(true)
  }
  let checkReaction = async () => {
    if (placedReagents.length == 0){
      setWrongReaction(true);
      return
    }
    let products = await getProducts(placedReagents);
    if (!products){
      setWrongReaction(true);
      return
    }
    setProducts(products)
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
    setProducts([]);
    setCurrentReagent(selectedReagent);
    setTableVisible(true);
    fetchReagents().then((result) => setDiscoveredReagents(result))
  };
  return (
    <main>
      <div className={styles.container}>
        <ControlPanel 
          setHistoryVisible={() => updateHistory()}
        />
        <div className={styles.reagents}>
          <ReagentPlace setReagent={() => showTable(null)} />
          {placedReagents.map((reagent, i) => {
            return(
              <ReagentPlace
                key={i} 
                setReagent={(placedReagent: Reagent) => showTable(placedReagent)} 
                deleteReagent={(reag: Reagent) => {
                  deleteReagent(reag);
                  setProducts([])
                }}
                value={reagent} />
            )
          })}
          {placedReagents.length != 0 && 
            <ReactionBtn 
              startReaction={checkReaction} //back
              isWrongReaction={isWrongReaction}
            />}
          {products.length == 0 || products.map((product, i) => {
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