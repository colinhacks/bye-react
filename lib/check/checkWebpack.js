const path = require('path');
const fs = require('fs');


module.exports = (state)=>{
  return new Promise((res,rej)=>{
    let configPath = path.resolve(process.cwd(), "webpack.config.js")
    if(!fs.existsSync(configPath)){
      return res(false)
      // return rej("ERROR: could not find webpack.config.js.\nAre you in the root directory of your project?")
    }
    console.log("Webpack detected...")
    res(true)
  })
}
