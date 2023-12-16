import { EmptyCell } from '@/app/lib/definitions'

export default function Empty({ elem } : { elem: EmptyCell }) {
  return <div className={elem.span}/>
}