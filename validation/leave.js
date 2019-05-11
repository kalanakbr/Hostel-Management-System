const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLeaveInput(data){
    let errors = {};

    data.reason = !isEmpty(data.reason) ? data.reason : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    
    if(Validator.isEmpty(data.reason)){
        errors.reason ='Reason field is required';
    }

    if(Validator.isEmpty(data.from)){
        errors.from ='From date field is required';
    }


    return{
        errors,
        isValid:isEmpty(errors)  
        };
}