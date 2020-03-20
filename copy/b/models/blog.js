
const mongoose = require('mongoose')

mongoose.set('useFindAndModify',false)
mongoose.set('useUnifiedTopology',true)//from warning


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON',{
    transform: (doc,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Blog',blogSchema)

