/**
 * Create by zzy
 */
import Sequelize from 'sequelize'
import Mysql from './../../db/mysql'
let cols = {
  name:{
    type:Sequelize.STRING(100),
    allowNull:false,
  },
  passwd:{
    type:Sequelize.STRING(100),
    allowNull:false,
  },
}

let User = Mysql.sequelize.define('User',cols,{tableName:'ts_user'})
Mysql.sequelize.sync()
export default User
