// import models
const { User } = require('../models/User')
const { Thought } = require('../models/Thought')

// set up thoughtController
const thoughtController = {
    // GET all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err))
    },

    // GET one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with this ID!' })
                } else {
                    return res.json(thoughtData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Create thought 
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' });
                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with this ID!' })
                } else {
                    return res.json(thoughtData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Delete thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.thoughtId }
        )
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this ID!' })
                } else {
                    return User.findOneAndUpdate(
                        { _id: params.userId },
                        { $pull: { thoughts: params.thoughtId } },
                        { new: true }
                    )
                }
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' });
                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Create reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with this ID!' })
                } else {
                   return res.json(thoughtData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Delete reaction
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    }
}


module.exports = thoughtController