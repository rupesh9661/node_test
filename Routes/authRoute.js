const routes = require('express').Router();

//controllers
const authController=require('../Controllers/auth')

// middlewares 
const {validateToken}= require('../Middlewares/jwt')

// routes 
routes.post('/register' ,authController.register)
routes.post('/login',authController.login)
routes.get('/get_details',validateToken,authController.getData)

module.exports= routes;