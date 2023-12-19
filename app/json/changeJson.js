const fs = require('node:fs/promises');

let recreateId = async () => {
  let chemElems = JSON.parse(await fs.readFile('reagents.json', {encoding: 'utf8'}));
  

  chemElems.map((elem, i) => {
    elem = {
      id: elem.id,
      sign: elem.sign,
      name: elem.name
    }
  })

  
  let prettyJSON = JSON.stringify(chemElems, null, 2);
  chemElems = JSON.stringify(chemElems);
  try {
    await fs.writeFile('reagents.json', prettyJSON, {encoding: 'utf8'})
  }
  catch (err) {
    console.log(chemElems);
    console.log(err)
  }
}
recreateId();