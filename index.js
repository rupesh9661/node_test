const express = require('express')
const app = express()
const { models, sequelize } = require('./Models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// routes
app.use('/user/', require('./Routes/AuthRoute'))
app.use('/game/', require('./Routes/GameRoute'))

app.use(function(err, req, res, next){
  console.log(err)
  res.status(500).send({message:"something went wrong", err:err.message?err.message:''})
})
app.listen(5000,()=>{
  console.log("app is listening on 5000");
})