import express from 'express'
import User from './../model/user'
let router = express.Router()

router.get('/',(req,res) => {
  let msg = req.query.msg || ''
  let name = 'zzy'
  let passwd = '123123'
  User.save({name,passwd}).then((user) => {
    console.log('save',user);
    res.send(`Hello World ${msg}`)
  })

})

export default router
