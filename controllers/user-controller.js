// import models
const { User, Thought } = require("../models")


// set up user controller
const userController = {

    // GET All user
    getAllUser(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    // GET One user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            // thoughts
            .populate('thoughts')
            // friends
            .populate('friends')
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' })

                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Create new user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    // Update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' })
                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

 
    //delete a user by id ----bonus: delete a user and also delete thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User find with this ID!" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },


    // Add friends --- /api/user/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' })
                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Delete friends
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' })
                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    }
}

module.exports = userController