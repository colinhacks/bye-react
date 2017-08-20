const runCommands = require("../runCommands")

module.exports = (state)=>{
  
  let uninstallPreact = state.usesYarn ? "yarn remove preact preact-compat" : "npm uninstall preact preact-compat"
  let installReact = state.usesYarn ? "yarn add react react-dom" : "npm install react react-dom --save"

  return runCommands([
    uninstallPreact,
    installReact
  ])
}
