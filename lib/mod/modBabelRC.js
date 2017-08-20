const path = require('path');
const fs = require('fs');
const cjson = require("cjson")

module.exports = (state)=>{
  return new Promise((res,rej)=>{
    
    console.log("Adding alias to .babelrc with babel-plugin-module-resolver...")
    let babelRCPath = path.resolve(process.cwd(), ".babelrc")
    let babelRCContents = fs.existsSync(babelRCPath) ? fs.readFileSync(babelRCPath, 'utf8') : "{}"
    let babelRC = cjson.parse(babelRCContents)

    babelRC.plugins = babelRC.plugins || []

    let moduleResolverSeen = false
    let moduleResolver = ["module-resolver", {
      "root": ["."],
      "alias": {
        "react": "preact-compat",
        "react-dom": "preact-compat",
        "create-react-class": "preact-compat/lib/create-react-class"
      }
    }]

    for(let pluginIndex in babelRC.plugins){
      let plugin = babelRC.plugins[pluginIndex]
      if(Array.isArray(plugin)){
        if(plugin[0] == "module-resolver"){
          moduleResolverSeen = true
          babelRC.plugins[pluginIndex] = moduleResolver
        }
      }
    }

    if(!moduleResolverSeen){
      babelRC.plugins.push(moduleResolver)
    }

    fs.writeFileSync(babelRCPath, JSON.stringify(babelRC,null,2))
    res("Successfully modified .babelrc.")

  })
}
