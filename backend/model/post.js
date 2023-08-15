const mongoose = require('mongoose');
const { Schema } = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
    },
    content: {
        type: String,
        require: true
    },
    creator: {
        type: Object,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)