const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf')

module.exports = ()=>{
  let byeReactDir = path.resolve(process.cwd(), ".bye-react")
  if(!fs.existsSync(byeReactDir)){
    fs.mkdirSync(byeReactDir)
  }
  for (var file of [".babelrc", "package.json", "webpack.config.js"]){
    let filePath = path.resolve(process.cwd(), file)
    let duplicatePath = path.join(byeReactDir, file)
    if(fs.existsSync(filePath) && !fs.existsSync(duplicatePath)){
      let contents = fs.readFileSync(filePath,'utf8')
      fs.writeFileSync(duplicatePath, contents)
    }
  }
  console.log("Backing up config files...")
  return new Promise((res)=>res())
}