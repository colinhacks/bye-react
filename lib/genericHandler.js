
const colors = require('colors/safe');

module.exports = (err)=>{
  console.log(err)
  console.log("GENERICHANDLER")
  console.log(colors.red(err.toString()))
  process.exit()
}