export type ElemCell = {
  sign: string,
  name: string,
  atomMass: number,
  subgroup: string,
  elecConf: number[],
  chemProp: string,
  atomNum: number,
  type: string,
  realSign: string
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
  reagents: Reagent[],  // id: number,
  products: Reagent[]   // reagents: number[],
                        // products: number[],
                        // conditions: object
}

export type Reagent = {
  sign: string,         // id: number,
  name: string          // sign: string,
                        // name: string
}

export type DiscReagent = { //backend
  id: number,
  userId: number,
  reagent: number
}

export type DiscReaction = { //backend
  id: number,
  userId: number,
  reaction: number
}