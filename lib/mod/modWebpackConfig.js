const path = require('path');
const fs = require('fs');

const newWebpackConfigs = [
  "",
  "",
  "// adding aliases for preact",
  "// apologies for the ugliness",
  "// robustness > aesthetics in this case",
  "module.exports.resolve = module.exports.resolve || {}",
  "module.exports.resolve.alias = module.exports.resolve.alias || {}",
  "module.exports.resolve.alias['react'] = 'preact-compat'",
  "module.exports.resolve.alias['react-dom'] = 'preact-compat'",
  "module.exports.resolve.alias['create-react-class'] = 'preact-compat/lib/create-react-class'",
  ""
]

module.exports = (state)=>{
  return new Promise((res,rej)=>{
    let configPath = path.resolve(process.cwd(), "webpack.config.js")
    fs.appendFile(configPath, newWebpackConfigs.join("\n"), (err)=>{
      if(err) {
        return rej(err)
      }
      return res()
    })
  })
}
