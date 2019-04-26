const mongoose  = require ('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
    regNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);