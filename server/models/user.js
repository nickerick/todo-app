const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    tasks: [
    {
        description: String,
        done: Boolean
    }]
})

module.exports = mongoose.model('User', userSchema)