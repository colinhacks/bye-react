const fs = require('fs');
const path = require('path');

module.exports = (state)=>{
  return new Promise((res,rej)=>{
    let yarnLock = path.resolve(process.cwd(), "yarn.lock")
    let usesYarn = fs.existsSync(yarnLock)
    res(usesYarn)
  })
}