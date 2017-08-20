#!/usr/bin/env node
const co = require('co');
const fs = require('fs');
const path = require('path');

const initialize = require("./initialize")
const undo = require("./undo")
const genericHandler = require("./genericHandler")

const installPreact = require("./install/installPreact")
const installAliasify = require("./install/installAliasify")
const installBabelPluginResolver = require("./install/installBabelPluginResolver")

const getUsesYarn = require("./get/getUsesYarn")

const checkForPackageJSON = require("./check/checkForPackageJSON")
const checkWebpack = require("./check/checkWebpack")
const checkBabel = require("./check/checkBabel")
const checkBrowserify = require("./check/checkBrowserify")

const modWebpackConfig = require("./mod/modWebpackConfig")
const modBabelRC = require("./mod/modBabelRC")
const modBrowserifyConfig = require("./mod/modBrowserifyConfig")

var program = require('commander');

program
  .option('-u, --undo', 'Undo all changes done by bye-react.')
  .parse(process.argv);


let changesMade = false

let start = ()=>{

  let state = {}

  initialize()
  .then(getUsesYarn)
  .then((usesYarn)=>{
    state.usesYarn = usesYarn
    return state
  })
  .then(checkForPackageJSON)
  .then(()=>{
    return installPreact(state)
  })
  .then(checkWebpack)
  .then((usesWebpack)=>{
    if(usesWebpack) {
      changesMade = true
      return modWebpackConfig()
    }
    return
  })
  .then(checkBabel)
  .then((usesBabel)=>{
    if(usesBabel){
      changesMade = true
      return installBabelPluginResolver(state).then(modBabelRC)

    }
    return
  })
  .then(checkBrowserify)
  .then((usesBrowserify)=>{
    if(usesBrowserify){
        changesMade = true
       return installAliasify(state).then(modBrowserifyConfig)
    }
    return
  }).then((state)=>{
    if(changesMade){
      console.log("\nDONE!")
      console.log("- Build and run the project as you normally would.")
      console.log("- If you encounter a bug, running `bye-react-undo` will undo all the changes made by this tool.")
    }else{
      console.log("Did not detect Browserify, Webpack, or Babel.")
      console.log("One of these three is required for this tool to work.")
      console.log("Try following the steps for \"Manually aliasing\" at https://preactjs.com/guide/switching-to-preact.")
    }
    process.exit()
    return
  }).catch(genericHandler)
}

console.log(JSON.stringify(program.undo,null,2))
if(program.undo){
  console.log("Undoing bye-react...")
  undo()
}else{
  console.log("Running bye-react...")
  start()
}