export default function cache(type){
  return function(target,name,descriptor){
    const fn = descriptor.value
    descriptor.value = async function(){
      let value = await fn.apply(this,arguments)
      console.log('cache',value)
      return value
    }
  }
}
