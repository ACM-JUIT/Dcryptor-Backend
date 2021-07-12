const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please write Your Name"]
    },
    email: {
        type: String,
        required:[true, 'Please specify your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
        type: String, 
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String, 
        required: [true, 'Please Specify your Password'],
        minLength: 8,
        select: false
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User