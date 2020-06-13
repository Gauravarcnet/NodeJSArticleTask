require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../components/user/user.controller');
let _ = require('lodash')

// console.log("User.userInformation", User.getUserInformation());


const {
  errors
} = require('./response');

function authenticate() {
  const methods = {
    verifyToken: async (req, res, next) => {
      try {

        //
        let token = req.body.access_token

        if (!token)
          return errors(res, 401)
        let decoded = await jwt.verify(token, process.env.secret_key)
        console.log("decoded", decoded);

        let userInformationData = User.getUserInformation()
        let userData = await  _.filter(userInformationData, (obj) => {
          if (obj.email === decoded.email) {
            return obj.email
          }
        })

        if (userData) {
          req.user = userData;
          next();
        } else {
          return errors(res, 401);
        }
      } catch (error) {
        console.log(error);

        return errors(res, 400, 'Invalid token')

      }


    }
  };
  return Object.freeze(methods);
}
module.exports = authenticate();
