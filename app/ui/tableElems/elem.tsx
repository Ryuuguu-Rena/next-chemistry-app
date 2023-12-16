import styles from '@/app/ui/tableElems/elem.module.css'
import { ChemElem } from '@/app/lib/definitions'

export default function Elem({ elem } : { elem: ChemElem }) {
  let elemStyle = elem.chemProp == 'm' ? styles.metal : elem.chemProp == 'n' 
    ? styles.nemetal : elem.chemProp == 'a' ? styles.amphotern : styles.gas;
  return(
    <div className={styles.elem + ' ' + elemStyle}>
      <div className={styles.sign}>
        {elem.sign}
      </div>
      <div className={styles.name}>
        {elem.name}
      </div>
      <div className={styles.atomNum}>
        {elem.atomNum}
      </div>
      <div className={styles.atomMass}>
        {elem.atomMass}
      </div>
      <div className={styles.elecConf}>
        {elem.elecConf.map((electron, i) => {
          return(
            <div key={i} className={styles.electr}>{electron}</div>
          )
        })}
      </div>
    </div>
  )
}