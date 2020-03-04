const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        required:true,
        type:String,
        unique:true,
        minlength:5,
        maxlength:32
    },
    password:{
        required:true,
        type:String,
        minlength:5,
        maxlength:128
    }
});

module.exports = mongoose.model('user',UserSchema);