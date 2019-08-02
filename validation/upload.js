const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateUploadInput(data){
    let errors = {};

    data.profilePicture = !isEmpty(data.profilePicture) ? data.profilePicture : '';
    
    if(Validator.isEmpty(data.profilePicture)){
        errors.profilePicture ='profile picture is required';
    }

    if(Validator.isEmpty(data.password)){
        errors.password ='Password field is required';
    }


    return{
        errors,
        isValid:isEmpty(errors)  
        };
}