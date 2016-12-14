/**
 * created by zzy
 */
import Commons from './../utils/commons'
import redis from 'redis'
const config = Commons.getConfig('redis')
export default class Redis {
  static connection = redis.createClient(config.port,config.host,{auth_pass:config.password,prefix:'te:'})
}
