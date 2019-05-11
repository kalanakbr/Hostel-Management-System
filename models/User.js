const mongoose  = require ('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required:true
    },
    
    contactNo:{
        type:Number,
        required:true
    },
    guardianName: {
        type: String,
        required:true
    },
    guardianTel:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);