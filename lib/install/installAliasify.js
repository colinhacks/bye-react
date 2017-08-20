const runCommands = require("../runCommands")

module.exports = (state)=>{
  console.log("Installing aliasify...")
  let command = state.usesYarn ? "yarn add aliasify --dev" : "npm install --save-dev aliasify"
  return runCommands([
    command
  ])
}
