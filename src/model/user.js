/**
 * Create by zzy
 */
import { mixins } from './../decorators/mixins';
import Mysql from './mysql/user'
import cache from './../decorators/cache'
const Foo = {
  foo() { console.log('foo') }
}

@mixins(Foo)
export default class User{

  @cache('redis')
  static async save({name,passwd}) {
    let user = await Mysql.create({name,passwd})
    return user
  }
}
