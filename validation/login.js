const validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';



    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'email field is required';
    }    

    if (validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
    }
    /*if (!validator.isLength(data.password, {min: 5, max: 30})) {
        errors.password = 'Password must be at least 5 characters';
    }*/

    return {
        errors,
        isValid: isEmpty(errors)
    };
};