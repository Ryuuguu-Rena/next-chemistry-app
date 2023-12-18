const fs = require('node:fs/promises');

let recreateId = async () => {
  let chemElems = JSON.parse(await fs.readFile('chemElems.json', {encoding: 'utf8'}));
  chemElems.map((elem, i) => {
    delete elem.id
  })
  chemElems = JSON.stringify(chemElems, null, 2);
  try {
    await fs.writeFile('chemElems.json', chemElems, {encoding: 'utf8'})
  }
  catch (err) {
    console.log(chemElems);
    console.log(err)
  }
}
recreateId();