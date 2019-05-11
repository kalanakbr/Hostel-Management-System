const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users' //model->User ->user
    },
    handle: {
      type: String,
      required: true,
      max: 40
    },
    regNo: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required:true
    },
    course : {
        type:String,
        
    },
    hall : {
        type:String,
        
    },
    roomNo : {
        type:String,
        required:true
    },
    dob: {
        type: Date,
       
    },
    gender: {
        type:String,
        required:true
    },
    NIC:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    contactNo:{
        type:[Number],
        required:true
    },
    guardianName: {
        type: String,
        required:true
    },
    guardianTel:{
        type:[String],
        required:true
    },
    leave: [
        {
          reason: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
