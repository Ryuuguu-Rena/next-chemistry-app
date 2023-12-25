const { db } = require('@vercel/postgres');
const fs = require('node:fs/promises');

async function seedReagents(client) {
  try {

    // const createTable = await client.sql`
    // CREATE SEQUENCE ReagentIdSeq;
    // CREATE TABLE IF NOT EXISTS Reagent (
    //   IdReagent int default nextval('ReagentIdSeq') PRIMARY KEY,
    //   Sign varchar(30) NOT NULL UNIQUE,
    //   Name varchar(100) NOT NULL UNIQUE
    //   );
    //   ALTER SEQUENCE ReagentIdSeq owned by Reagent.IdReagent
    // `;
    // console.log('created reagents table')
  
    let reagents = JSON.parse(await fs.readFile('./app/json/DBreagents.json', {encoding: 'utf8'}));
    const insertedReagents = await Promise.all(
      reagents.map((reagent) => client.sql`
          INSERT INTO reagents (sign, name)
          VALUES (${reagent.sign}, ${reagent.name})
        `
      )
    );
    console.log('Seeded ' + insertedReagents.length + ' reagents')
  }
  catch (error) {
    console.error('error seeding users:', error);
    throw error
  }
}



async function main() {
  const client = await db.connect();

  await seedReagents(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
  
});
