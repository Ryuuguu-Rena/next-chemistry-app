export type ChemElem = {
  sign: string,
  name: string,
  atomMass: number,
  subgroup: string,
  elecConf: number[],
  chemProp: string,
  atomNum: string | number,
  type: string
}

export function isChemElem(elem: ChemElem): elem is ChemElem {
  return elem.type == 'elem'
}

export type EmptyCell = {
  span: string,
  type: string
}

export type MarkupCell = {
  content: string,
  span: string,
  type: string
}

export type Reaction = {
  id: number,
  reagents: string[],
  products: string[],
  conditions: object
}
