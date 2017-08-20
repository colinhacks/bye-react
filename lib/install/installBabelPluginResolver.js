const runCommands = require("../runCommands")

module.exports = (state)=>{
  console.log("Installing babel-plugin-module-resolver...")
  let command = state.usesYarn ? "yarn add babel-plugin-module-resolver --dev" : "npm install --save-dev babel-plugin-module-resolver"
  return runCommands([
    command
  ])
}
