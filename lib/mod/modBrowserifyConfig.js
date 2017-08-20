const path = require('path');
const fs = require('fs');
const cjson = require("cjson")

module.exports = (state)=>{
  return new Promise((res,rej)=>{
    
    console.log("Adding new alias to package.json with aliasify...")
    let packageJSONPath = path.resolve(process.cwd(), "package.json")
    let packageJSONContents = fs.readFileSync(packageJSONPath, 'utf8') || "{}"
    let packageJSON = cjson.parse(packageJSONContents)

    packageJSON.aliasify = packageJSON.aliasify || {}
    packageJSON.aliasify.aliases = packageJSON.aliasify.aliases || {}
    packageJSON.aliasify.aliases['react'] = "preact-compat"
    packageJSON.aliasify.aliases['react-dom'] = "preact-compat"
    packageJSON.aliasify.aliases['create-react-class'] = "preact-compat/lib/create-react-class"

    fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON,null,2))
    res("Successfully modified package.json.")

  })
}
