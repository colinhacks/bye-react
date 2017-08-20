const path = require('path');
const fs = require('fs');
const cjson = require("cjson")


module.exports = (state)=>{
  return new Promise((res,rej)=>{

    let babelRCPath = path.resolve(process.cwd(), ".babelrc")
    if(fs.existsSync(babelRCPath)){
      let babelRCContents = fs.readFileSync(babelRCPath, 'utf8') || "{}"
      let babelRC = cjson.parse(babelRCContents)
      if(babelRC.presets.includes("react")){
        console.log("\n###################\nBabel detected.")
        return res(true)
        // return rej("ERROR: it doesn't look like you're using the React preset for Babel.\nSpecifically, we couldn't find \"react\" in the list of presets in your .babelrc file.")
      }
      // return rej("ERROR: could not find webpack.config.js.\nAre you in the root directory of your project?")
    }

    let packageJSONPath = path.resolve(process.cwd(), "package.json")
    let packageJSONContents = fs.readFileSync(packageJSONPath, 'utf8') || "{}"
    let packageJSON = cjson.parse(packageJSONContents)
    if(packageJSON['dependencies'] && packageJSON['dependencies']['babel-preset-react']){
      console.log("\n###################\nBabel detected.")
      return res(true)
    }
    if(packageJSON['devDependencies'] && packageJSON['devDependencies']['babel-preset-react']){
      console.log("\n###################\nBabel detected.")
      return res(true)
    }
    console.log("Babel not detected.")
    res(false)
  })
}
