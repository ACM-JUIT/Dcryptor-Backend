const mongoose = require('mongoose')
const validator = require('validator')

const historySchema = new mongoose.Schema({
    decodedAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    outcome: {
        type: String,
    },
    stringtoDecode: {
        type: String,
        required: [true, "Error - No string Provided"]
    },
    decoded_Text: [
        {
            type: String
        }
    ]
})


const history = mongoose.model('History', historySchema)

module.exports = history