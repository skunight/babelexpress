import express from 'express'
let router = express.Router()

router.get('/',(req,res) => {
  let msg = req.query.msg
  res.send(`Hello World ${msg}`)
})

export default router
