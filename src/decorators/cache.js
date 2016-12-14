/**
 * created by zzy
 */
const TYPE = {
  MEMORY:'memory',
  REDIS:'redis',
}

export default function cache(table,cacheType){
  return function(target,name,descriptor){
    const fn = descriptor.value
    descriptor.value = async function(){
      let value = await fn.apply(this,arguments)
      let str = new Buffer(JSON.stringify(value)).toString("base64")
      if(cacheType == TYPE.MEMORY) {
        if(!global[table]){
          global[table] = {}
        }
        global[table][value.get('id')] = str
      } else if (cacheType == TYPE.REDIS) {
        let key = `${table}:${value.get('id')}`
        Redis.set(key,str)
      }
      return value
    }
  }
}
