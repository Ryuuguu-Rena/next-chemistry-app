import { sql } from '@vercel/postgres'
import { Reaction, Reagent } from './definitions';
import { arraysEqual } from './utils';

export async function fetchReactions() {
  try {
    let reagentsPromise = sql`
      SELECT discovered_reactions.id_reaction, reagents.sign, reagents.name FROM discovered_reactions
      JOIN reaction_reagents
      ON discovered_reactions.id_reaction = reaction_reagents.id_reaction
      JOIN reagents
      ON reagents.id_reagent = reaction_reagents.id_reagent
      WHERE discovered_reactions.id_user = ${process.env.ID_USER}
      ORDER BY discovered_reactions.id_reaction
    `;
    let productsPromise = sql`
      SELECT discovered_reactions.id_reaction, reagents.sign, reagents.name FROM discovered_reactions
      JOIN reaction_products
      ON discovered_reactions.id_reaction = reaction_products.id_reaction
      JOIN reagents
      ON reagents.id_reagent = reaction_products.id_reagent
      WHERE discovered_reactions.id_user = ${process.env.ID_USER}
      ORDER BY discovered_reactions.id_reaction
    `;
    let [reagents, products] = 
      (await Promise.all([reagentsPromise, productsPromise])).map((item) => item.rows);
    let reactions: any = [];
    let reactionId = 0;
    reagents.forEach((reag) => {
      if (reactionId != reag.id_reaction) {
        reactions.push({reagents: [], products: []});
        reactionId = reag.id_reaction
      }
      reactions[reactions.length - 1].reagents.push({sign: reag.sign, name: reag.name})
    });
    reactionId = 0;
    let arrPos = -1;
    products.forEach((prod) => {
      if (reactionId != prod.id_reaction){
        arrPos++;
        reactionId = prod.id_reaction
      }
      reactions[arrPos].products.push({sign: prod.sign, name: prod.name})
    });
    console.log(reagents)

    return reactions as Reaction[]
  }
  catch (error) {
    console.log('Database error: ', error)
    throw new Error('Failed to fetch reactions data')
  }
}

export async function fetchReagents() {
  try {
    let reagents = await sql`
      SELECT reagents.sign, reagents.name FROM discovered_reagents 
      JOIN reagents
      ON reagents.id_reagent = discovered_reagents.id_reagent
      WHERE id_user = ${process.env.ID_USER}
    `;
    return reagents.rows as Reagent[]
  }
  catch (error) {
    console.log('Database error: ', error)
    throw new Error('Failed to fetch reagents data')
  }
}

export async function getProducts(reagents: Reagent[]) {
  try {
    let reagentsPart = (await sql`
      SELECT reactions.id_reaction, reagents.sign FROM reactions
      JOIN reaction_reagents
      ON reactions.id_reaction = reaction_reagents.id_reaction
      JOIN reagents
      ON reagents.id_reagent = reaction_reagents.id_reagent
      ORDER BY reactions.id_reaction
    `).rows;

    let reactionReagents: any[] = [];
    let reactionId = 1;
    let isFounded = false;
    for (let i = 0; i < reagentsPart.length; i++){
      if (reactionId != reagentsPart[i].id_reaction) {
        reactionReagents = [];
        reactionId = reagentsPart[i].id_reaction
      }
      reactionReagents.push(reagentsPart[i].sign)
      if (arraysEqual(reactionReagents, reagents.map((reag) => reag.sign))){
        reactionId = reagentsPart[i].id_reaction;
        isFounded = true;
        break
      }
    }

    let result;
    if (isFounded){
      let isDiscovered = (await sql`
      SELECT id_reaction FROM discovered_reactions
      WHERE id_user = ${process.env.ID_USER} and id_reaction = ${reactionId}
      ORDER BY discovered_reactions.id_reaction
      `).rows.length == 0 ? false : true;
      if (!isDiscovered){
        await sql`
        INSERT INTO discovered_reactions VALUES (${process.env.ID_USER}, ${reactionId})
        `
      }
      result = (await sql`
        SELECT reagents.sign, reagents.name FROM discovered_reactions
        JOIN reaction_products
        ON discovered_reactions.id_reaction = reaction_products.id_reaction
        JOIN reagents
        ON reagents.id_reagent = reaction_products.id_reagent
        WHERE discovered_reactions.id_user = ${process.env.ID_USER} and discovered_reactions.id_reaction = ${reactionId}
        ORDER BY discovered_reactions.id_reaction
      `).rows;
    }
    return result ? result as Reagent[] : null
  }
  catch (error) {
    console.log('Database error: ', error)
    throw new Error('Failed to set reactions data')
  }
}