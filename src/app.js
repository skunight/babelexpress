import express from 'express'
import compression from 'compression'
import log4js from 'log4js'
import http from 'http'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import api from './router/api'
import ResponseIntercept from './intercept/responseIntercept'
import mysql from './db/mysql'
export default class App {
  constructor(port){
    this.port = port || process.env.PORT || 3000
    log4js.configure({
      appenders:[
        {type:'console'}
      ],
      replaceConsole:true,
    })
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
    app.use(ResponseIntercept.filter)
    app.use('/',api)
    let server = http.createServer(app)
    server.listen(this.port,'0.0.0.0')
    server.on('listening',() => console.log(`Listening on ${this.port} and env is ${app.get('env')}`))
  }
}
