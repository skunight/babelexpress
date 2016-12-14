/**
 * Created by zzy
 */
import fs from 'fs-plus'
import path from 'path'

export default class Commons {
  static getConfig(name) {
    let filePath = path.join(__dirname,`./../config/${process.env.NODE_ENV}/${name}.json`)
    if(!fs.existsSync(filePath)){
      filePath = path.join(__dirname,`./../config/production/${name}.json`)
    }
    return require(filePath)
  }
}
