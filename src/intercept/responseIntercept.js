export default class ResponseIntercept {
  static filter (req,res,next) {
    res._end = res.end
    res.end = (data,encoding,callback) => {
      if(data){
        res._resData = data.toString('utf8')
      }
      res._end(data,encoding,callback)
    }
    console.log('****************request*****************')
    console.log(req.method,req.originalUrl)
    let body = req.body
    Object.assign(body,req.query,req.params,res.locals);
    console.log('request:',body)
    console.time(`${req.baseUrl}${req.path}请求耗时:`)
    console.log('**************end request***************')
    res.on('finish',() => {
      console.log('****************response*****************')
      console.timeEnd(`${req.baseUrl}${req.path}请求耗时:`)
      console.log('**************end response***************')
    })
    next()
  }
}
