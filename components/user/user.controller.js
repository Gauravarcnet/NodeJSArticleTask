const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
let _ = require('lodash')
let userInformation = []

/* 
    Success and errors are the response method that we have defined 
    already in response So we can follow standward way and error handling
*/
const {
  success,
  errors
} = require('../../utils').response

function userCtrl() {
  const methods = {

    //generate bcrypt password
    hashPassword: async (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    // Compare password
    validPassword: async (password, userPassword) => {
      return bcrypt.compareSync(password, userPassword);
    },
    userInformation: async (data) => {
      try {

      } catch (error) {

      }
    },
    // user signup 
    registration: async (req, res) => {
      try {
        let data = req.value,
          id = 0,
          user = await _.filter(userInformation, (obj) => {
            if (obj.email === data.email) {
              return obj.email
            }
          })


        // If user already exist Response with 
        if (user.length > 0) return errors(res, 403, 'User Already Exist')

        // creating user object
        let newUser = {
          id: id,
          userName: data.userName || '',
          password: data.password ? await methods.hashPassword(data.password) : '',
          email: data.email,
          address: data.address || ''

        }
        /**
         * i am storing user data in memory  but we can also
         * store it in database 
         */
        userInformation.push(newUser)

        return success(res, 201, '', 'new user created')

      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    },
    // Login user 
    signIn: async (req, res) => {
      try {

        let value = req.value,
          user = await _.filter(userInformation, (obj) => {
            if (obj.email === value.email) {
              return obj.email
            }
          })


        if (!user.length > 0) {
          return errors(res, 400, 'user not Found', 'no user found')

        } else {
          //Verifying user password

          if (await methods.validPassword(value.password, user[0].password)) {

            user[0].loggedIn = new Date()

            const {
              id,
              email,
              loggedIn
            } = user[0]

            //Creating payload for jwt
            const tokenData = {
              id,
              email,
              loggedIn
            }

            /* Generating jwt token
               Not using expiry time for jwt token bt we can make expiry
            */
            let token = jwt.sign(tokenData, process.env.secret_key)

            data = {
              token
            }

            return success(res, 200, data, 'user data')

          } else {
            return errors(res, 400, 'Invalid email/Password', 'Invalid email/Password')
          }
        }

      } catch (e) {
        console.log(e)
        return errors(res, 500, e)
      }
    },
    getUserInformation: () => {
      try {
        return userInformation
      } catch (error) {
        console.log(error);

      }
    }
  }
  return Object.freeze(methods)
}

module.exports = userCtrl()