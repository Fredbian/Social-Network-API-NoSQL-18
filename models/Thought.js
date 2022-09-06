// import mongoose
const { Schema, model, Types } = require("mongoose")

// create reactionSchema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON:{
            virtuals: true
        }
    }
)


// create thoughtSchema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)


// get total reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// create Thought model
const Thought = model('thought', thoughtSchema)

module.exports = Thought