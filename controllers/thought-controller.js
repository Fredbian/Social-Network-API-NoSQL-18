// import models
const { User, Thought } = require('../models')

// set up thoughtController
const thoughtController = {
    // GET all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err))
    },

    // GET one thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
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
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(thought => {
                !thought
                    ? res.status(404).json({ message: "No User find with this ID!" })
                    : res.json(thought)
            })
            .catch(err => res.status(400).json(err))
    },

    // Update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
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
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId }
        )
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this ID!' })
                } else {
                    return User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
                }
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' });
                } else {
                    return res.json({ message: 'Delete Success!' })
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
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
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    }
}


module.exports = thoughtController