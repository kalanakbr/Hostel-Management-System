const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data){
    let errors = {};

    data.regNo = !isEmpty(data.regNo) ? data.regNo : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if(Validator.isEmpty(data.regNo)){
        errors.regNo ='RegNo field is required';
    }

    if(Validator.isEmpty(data.password)){
        errors.password ='Password field is required';
    }


    return{
        errors,
        isValid:isEmpty(errors)  
        };
}