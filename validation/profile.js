const Validator = require('validator');
const isEmpty =require('./is-empty') ;

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.regNo = !isEmpty(data.regNo) ? data.regNo : '';
    data.faculty = !isEmpty(data.faculty) ? data.faculty : '';
    data.course = !isEmpty(data.course) ? data.course : '';
    data.hall = !isEmpty(data.hall) ? data.hall : '';
    data.roomNo = !isEmpty(data.roomNo) ? data.roomNo : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.NIC = !isEmpty(data.NIC) ? data.NIC : '';
    data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : '';
    data.guardianName = !isEmpty(data.guardianName) ? data.guardianName : '';   
    data.guardianTel = !isEmpty(data.guardianTel) ? data.guardianTel : '';

    if(!Validator.isLength(data.handle, { min:2, max:40 })){
        errors.handle = 'Handle needs to between 2 and 4 characters';
    } 
    
    if(Validator.isEmpty(data.handle)){
        errors.handle ='Profile handle is required';
    }

    if(Validator.isEmpty(data.regNo)){
        errors.regNo ='RegNo field is required';
    }

    if(Validator.isEmpty(data.faculty)){
        errors.faculty ='Faculty field is required';
    }

    if(Validator.isEmpty(data.course)){
        errors.course ='Course field is required';
    }

    if(Validator.isEmpty(data.hall)){
        errors.hall ='Hall field is required';
    }

    if(Validator.isEmpty(data.roomNo)){
        errors.roomNo ='Room No. field is required';
    }

    if(Validator.isEmpty(data.gender)){
        errors.gender ='Gender field is required';
    }
    
    if(Validator.isEmpty(data.NIC)){
        errors.NIC ='National ID card  field is required';
    }

    if(Validator.isEmpty(data.contactNo)){
        errors.contactNo ='Contact Number field is required';
    }

    if(!Validator.isLength(data.contactNo, { min: 1 , max: 10 })){
        errors.contactNo = 'Contact Number must be between 1 and 10 Characters';
    }

    if(Validator.isEmpty(data.guardianName)){
        errors.guardianName ='Gurdian Name field is required';
    }
 
    if(Validator.isEmpty(data.guardianTel)){
        errors.guardianTel ='Gurdian telephone field is required';
    }

    if(!Validator.isLength(data.guardianTel, { min: 1 , max: 50 })){
        errors.guardianTel = 'Gurdian Telephone must be between 1 and 50 Characters';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    };

}