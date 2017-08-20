const path = require('path');
const fs = require('fs');
const colors = require('colors');

module.exports = ()=>{
  let packageJSON = path.resolve(process.cwd(), "package.json")
  if(!fs.existsSync(packageJSON)){
    console.log("FATAL: Can't find package.json.".red)
    process.exit()
    return res(false)
    // return rej("ERROR: could not find webpack.config.js.\nAre you in the root directory of your project?")
  }
}
