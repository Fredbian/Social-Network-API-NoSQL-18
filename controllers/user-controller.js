// import models
const { User, Thought } = require('../models')


// set up user controller
const userController = {

    // GET All user
    getAllUser(req, res) {
        User.find({})
            .then(userData => {
                res.json(userData)
            })
            .catch(err => res.status(400).json(err))
    },

    // GET One user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
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
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // Update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body, 
            { new: true, runValidators: true }
            )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' });
                    ;
                } else {
                    return res.json(userData)
                }
            })
            .catch(err => res.status(400).json(err))
    },

    // Delete a user by id --------- bonus not complete yet
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (userData) {
                    return res.status(404).json({ message: 'No user found with this ID!' })
                }
            })
            .then(() => res.json({ message: 'Delete Success!' }))
            .catch(err => res.status(400).json(err))
    },

    // Add friends --- /api/user/:userId/friends/:friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
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
    },

    // Delete friends
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
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