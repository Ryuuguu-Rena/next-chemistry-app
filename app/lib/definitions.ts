export type ElemCell = {
  sign: string,
  name: string,
  atomMass: number,
  subgroup: string,
  elecConf: number[],
  chemProp: string,
  atomNum: string | number,
  type: string
}

export function isElemCell(elem: ElemCell): elem is ElemCell {
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

export type Reagent = {
  id: number,
  sign: string,
  name: string
}