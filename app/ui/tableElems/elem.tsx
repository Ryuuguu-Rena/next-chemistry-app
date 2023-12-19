import styles from '@/app/ui/tableElems/elem.module.css'
import { ElemCell } from '@/app/lib/definitions'

export default function Elem({ elem } : { elem: ElemCell }) {
  return(
    <div className={styles.elem + ' ' + (elem.chemProp == 'm' ? styles.metal : elem.chemProp == 'n' 
    ? styles.nemetal : elem.chemProp == 'a' ? styles.amphotern : styles.gas)}>
      <div className={styles.sign + ' ' + (elem.subgroup == 'b' ? styles.bSign : '')}>
        {elem.sign}
      </div>
      <div className={styles.name + ' ' + (elem.subgroup == 'b' ? styles.bName : '')}>
        {elem.name}
      </div>
      <div className={styles.atomNum + ' ' + (elem.subgroup == 'b' ? styles.bAtomNum : '')}>
        {elem.atomNum}
      </div>
      <div className={styles.atomMass + ' ' + (elem.subgroup == 'b' ? styles.bAtomMass : '')}>
        {elem.atomMass}
      </div>
      <div className={styles.elecConf + ' ' + (elem.subgroup == 'b' ? styles.bElecConf : '')}>
        {elem.elecConf.map((electron, i) => {
          return(
            <div key={i} className={styles.electr}>{electron}</div>
          )
        })}
      </div>
    </div>
  )
}