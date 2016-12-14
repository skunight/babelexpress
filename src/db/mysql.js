/**
 * Created by zzy
 */
import Sequelize from 'sequelize'
import Commons from './../utils/commons'

const config = Commons.getConfig('mysql')
export default class Mysql {
  static sequelize = new Sequelize(config.name,null,null,{
    dialect: 'mysql',
    replication: {
      read: [ {
        host: config.read.hostname,
        username: config.read.username,
        password: config.read.password,
      } ],
      write: {
        host: config.write.hostname,
        username: config.write.username,
        password: config.write.password,
      },
    },
    pool: {
      max: 100,
      min: 0,
      idle: 10000,
    },
    timezone: '+08:00',
  })
}
