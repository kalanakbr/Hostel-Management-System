const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.regNo = !isEmpty(data.regNo) ? data.regNo : '';
    data.faculty = !isEmpty(data.faculty) ? data.faculty : '';
    data.hall = !isEmpty(data.hall) ? data.hall : '';
    data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : '';
    data.guardianName = !isEmpty(data.guardianName) ? data.guardianName : '';
    data.guardianTel = !isEmpty(data.guardianTel) ? data.guardianTel : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, { min: 2 , max: 30 })){
        errors.name= 'Name must be between 2 and 30 Characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name ='Name field is required';
    }

    if(Validator.isEmpty(data.regNo)){
        errors.regNo ='RegNo field is required';
    }

    if(Validator.isEmpty(data.faculty)){
        errors.faculty ='Faculty field is required';
    }


    if(Validator.isEmpty(data.hall)){
        errors.hall ='Hall field is required';
    }

    if(Validator.isEmpty(data.contactNo)){
        errors.contactNo ='Contact Number field is required';
    }

    if(!Validator.isLength(data.contactNo, { min: 1 , max: 10 })){
        errors.contactNo = 'Contact Number must be between 1 and 10 Characters';
    }

    if(Validator.isEmpty(data.guardianName)){
        errors.guardianName ='Guardian Name field is required';
    }
 
    if(Validator.isEmpty(data.guardianTel)){
        errors.guardianTel ='Guardian telephone field is required';
    }

    if(!Validator.isLength(data.guardianTel, { min: 1 , max: 50 })){
        errors.guardianTel = 'Guardian Telephone must be between 1 and 50 Characters';
    }

    if(Validator.isEmpty(data.password)){
        errors.password ='Password field is required';
    }

    if(!Validator.isLength(data.password, { min: 2 , max: 30 })){
        errors.password= 'Password must be between 2 and 30 Characters';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 ='Confirm password field is required';
    }

    if(!Validator.equals(data.password , data.password2)){
        errors.password2 ='Password must match';
    }

return{
    errors,
    isValid:isEmpty(errors)  
};
}