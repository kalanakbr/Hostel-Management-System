const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateNoticeInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, { min:10, max:300 })){
        errors.text = 'Notice must be between 5 and 300 characters'
    }
    if(Validator.isEmpty(data.text)){
        errors.text ='Text field is required';
    }

    return{
        errors,
        isValid:isEmpty(errors)  
        };
}