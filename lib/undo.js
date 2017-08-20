#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf')

const runCommands = require("./runCommands")
const getUsesYarn = require("./get/getUsesYarn")

const undo = ()=>{
  let byeReactDir = path.resolve(process.cwd(), ".bye-react")
  if(!fs.existsSync(byeReactDir)){
    fs.mkdirSync(byeReactDir)
  }

  console.log("Replacing config files from backup...")
  for (var file of [".babelrc", "package.json", "webpack.config.js"]){
    let originalPath = path.join(byeReactDir, file)
    let replacedPath = path.resolve(process.cwd(), file)
    if(fs.existsSync(originalPath)){
      console.log("Replacing original "+file+"...")
      let contents = fs.readFileSync(originalPath,'utf8')
      fs.writeFileSync(replacedPath, contents)
    }else if(fs.existsSync(replacedPath)){ // remove files that weren't there before
      console.log("Removing "+file+"...")
      fs.unlinkSync(replacedPath)
    }
  }

  rimraf.sync(byeReactDir)
  // fs.unlinkSync(byeReactDir)

  getUsesYarn().then((usesYarn)=>{
    let uninstallEverything = usesYarn ? "yarn remove preact preact-compat aliasify babel-plugin-module-resolver" : "npm uninstall preact preact-compat aliasify babel-plugin-module-resolver"
    let installReact = usesYarn ? "yarn add react react-dom" : "npm install react react-dom --save"

    return runCommands([
      uninstallEverything,
      installReact
    ])
  })


  return new Promise((res)=>res())
}

undo()