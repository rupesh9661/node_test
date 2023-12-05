const bcrypt = require('bcrypt')
const { createToken } = require('../Middlewares/jwt')
const dotEnv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const { models } = require('../Models');
const Users = models.user;
const publisher = require('../RabitMq/publisher')

module.exports = {

    register: async (req, res) => {
        try {
            const alData = await Users.findOne({ where: { "user_name": req.body.user_name } })
            if (alData) {
                throw ("this user name is already registered. please use new");
            }

            encryptedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password=encryptedPassword;
            let insRes = await Users.create(req.body);
            if (insRes) {
                // publishing message will work when rabitmq setup done 
                // publisher.publishEvent('user-registration-queue', 'a new user registered successfully')
                return res.send({ status_code: 200, message: "registration successfull" });
            }
            else
                throw ("something went wrong");
        } catch (err) {
            return res.send({ status_code: 400, message: err });
        }
    },

    login: async (req, res) => {
        try {
            let user = await Users.findOne({ where: { user_name: req.body.user_name } })
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                user.password = null;
                const token = createToken(user);
                return res.send({ status_code: 200, message: "login successfull", accessToken: token, user });
            } else {
                return res.send({ status_code: 400, message: "invalid credentials" });
            }

        } catch (err) {
            return res.send({ status_code: 400, message: err });
        }
    },

    getData: async (req, res) => {
        try {
            let user = await Users.findByPk(decodedToken.id);
            user.password = null;
            return res.send({ status_code: 200, message: "data fetched successfull", data: user });
        } catch (err) {
            return res.send({ status_code: 400, message: err });
        }
    },

}