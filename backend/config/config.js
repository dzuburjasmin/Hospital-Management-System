const {Sequelize} = require("sequelize")
const db = new Sequelize('hms','root','root',{
  host:'localhost',
  dialect:'mysql',
  port:'3306'
})

module.exports.db = db; 
module.exports.op = Sequelize.Op;