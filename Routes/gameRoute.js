const routes = require('express').Router();

//controllers
const GameController=require('../Controllers/game')

// middlewares 
const {validateToken}= require('../Middlewares/jwt')

// routes 
routes.post('/create',validateToken,GameController.create)
routes.patch('/update',validateToken,GameController.update)
routes.get('/get_all',validateToken,GameController.getAll)
routes.get('/get_by_id/:id',validateToken,GameController.getById)
routes.delete('/delete/:id',validateToken,GameController.delete)

module.exports= routes;