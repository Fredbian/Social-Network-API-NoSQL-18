// import express
const router = require('express').Router()

// link to controller
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// set up router for GET and POST for '/api/user'
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

// set up GET one, PUT, and DELETE for '/api/user/:id'

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// set up POST and DELETE for '/:userId/friends/:friendId'
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)  
    
module.exports = router    