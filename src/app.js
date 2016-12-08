import express from 'express'
import compression from 'compression'
import log4js from 'log4js'
import http from 'http'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
export default class App {
  constructor(port){
    log4js.configure({
      appenders:[
        {type:'console'}
      ],
      replaceConsole:true,
    })
    this.port = port || process.env.PORT || 3000
  }

  run() {
    let app = express()
    let logger = log4js.getLogger('normal')
    app.set('trust proxy')
    app.set('port',this.port)
    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(cookieParser())
    app.use(log4js.connectLogger(logger,{level:log4js.levels.INFO}))
    app.get('/',(req,res) => {
      let msg = req.query.msg
      res.send('Hello World '+msg)
    })
    let server = http.createServer(app)
    server.listen(this.port,'0.0.0.0')
    server.on('listening',() => console.log('Listening on '+this.port))
  }
}
