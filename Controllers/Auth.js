const bcrypt = require('bcrypt')
const { createToken } = require('../Middlewares/Jwt')
const dotEnv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const {models} = require('../Models');
const User=models.User;

module.exports = {

    register: async (req, res) => {
        try {
            const { name, email, contact, user_name: userName, password, isAgreed } = req.body
            const alData = await Stores.findOne({ where: { "user_name": userName } })
            if (alData) {
                throw ("this user name is already registered. please use new");
            }

            encryptedPassword = bcrypt.hashSync(password, 10);
            let insData = { name, contact, email, username: userName, password: encryptedPassword, is_agreed: isAgreed };
            let insRes = await Vendors.create(insData);
            if (insRes)
                res.send({ status_code: 200, message: "registration successfull" });
            else
                throw ("something went wrong");
        } catch (err) {
            res.send({ status_code: 400, message: err });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            let user = await Users.findOne({ where: { user_name: username } })
            if (user && bcrypt.compareSync(password, user.password)) {
                user.password = null;
                const token = createToken(user);
                res.send({ status_code: 200, message: "login successfull", accessToken: token, user });
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
            res.send({ status_code: 200, message: "data fetched successfull", data:user });
        } catch (err) {
            return res.send({ status_code: 400, message: err });
        }
    },

}