const path = require('path');
const fs = require('fs');
const colors = require('colors');
const { exec } = require('child_process');


module.exports = (state)=>{
  return new Promise((res,rej)=>{

    exec("browserify --version", (err, stdout, stderr) => {
      if(stdout.length && parseInt(stdout)){
        console.log("\n###################\nBrowserify detected.")
        res(true)
      }
      res(false)
    })
  })
}
