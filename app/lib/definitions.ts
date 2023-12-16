export type ChemElem = {
  id: number,
  sign: string,
  name: string,
  atomMass: number,
  subgroup: string,
  elecConf: number[],
  chemProp: string,
  atomNum: string | number,
  type: string
}

export type EmptyCell = {
  id: number,
  span: string,
  type: string
}

export type MarkupCell = {
  id: number,
  content: string,
  span: string,
  type: string
}