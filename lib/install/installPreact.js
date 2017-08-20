const runCommands = require("../runCommands")

module.exports = (state)=>{
  
  let uninstallReact = state.usesYarn ? "yarn remove react react-dom" : "npm uninstall react react-dom"
  let installPreact = state.usesYarn ? "yarn add preact preact-compat" : "npm install preact preact-compat --save"

  return runCommands([
    uninstallReact,
    installPreact
  ])
}
