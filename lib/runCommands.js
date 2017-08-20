const { exec } = require('child_process');

let runCommands = (commands)=>{
  return new Promise((res,rej)=>{
    if(!commands.length){
      return res()
    }
    let command = commands.shift()
    console.log("> "+command)

    const options = {maxBuffer: 1024 * 1700}
    let execution = exec(command, options, (err, stdout, stderr) => {
      if(err){
        console.log(err)
        return rej(err)
      }
      return runCommands(commands).then(()=>{
        if(!commands.length){
          res(true)
          return
        }
      })
    })
    execution.stdout.pipe(process.stdout);
    execution.stderr.pipe(process.stderr);
  })
}

module.exports = runCommands