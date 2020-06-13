function userRoutes() {
  const ctrl = require('./user.controller'),
    validationCtrl = require('./user.validator')
  return (open) => {

    //  Using Joi as middlwware before sending req to controller
    open.route('/register').post(validationCtrl.signUpValidation, ctrl.registration)
    open.route('/login').post(validationCtrl.signInValidation, ctrl.signIn)
  }
}

module.exports = userRoutes()