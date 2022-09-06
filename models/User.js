// import mongoose
const { Schema, model } = require('mongoose')

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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        timestamps: true,
        id: true
    },
    {
        toJSON: {
            virtual: true            
        }     
    }
)

// get total friends count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})


// create User model with Schema
const User = model('user', userSchema)

// export User model
module.exports = User