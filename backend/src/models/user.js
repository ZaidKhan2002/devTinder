const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Id")
            }
        },
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender error");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)) {
                throw new Error("Invalid URL")
            }
        },
    },
    skills: {
        type: [String],
    }
},
{
    timeStamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;