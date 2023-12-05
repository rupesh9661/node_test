const { sign, verify } = require("jsonwebtoken");
const {jwtDecode} = require('jwt-decode');
const dotEnv = require('dotenv').config()
const createToken = (user) => {
  let accessToken = '';
  accessToken = sign(
    { id: user.id, email: user.email },
    process.env.App_Secret_Key,
    { expiresIn: '1d' }
  );
  return accessToken;
};


const validateToken = (req, res, next) => {
  let accessToken = req.get('authorization');
  if (!accessToken)
    res.send({ code: 501, message: "User not Authenticated!" });
  else {
    try {
      accessToken = accessToken.slice(7);
      const validToken = verify(accessToken, process.env.App_Secret_Key);
      if (validToken) {
        decodedToken = jwtDecode(accessToken);
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      console.log(err)
      res.send({ code: 500, message: "something went wrong", error: err });
    }
  }
};


module.exports = { createToken, validateToken };
