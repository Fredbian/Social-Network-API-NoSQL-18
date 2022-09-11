// import mongoose
const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // email validation regex
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please fill a valid email address"]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtual: true        
        },
        id:false

    }
)

// get total friends count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})


// create User model with Schema
const User = model('User', userSchema)

// export User model
module.exports = User