// import express
const router = require('express').Router()

// link to controller
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// set up GET all thought - '/api/thought'
router.route('/').get(getAllThought)

// set up POST new thought- '/api/thought/:userId'
router.route('/:userId').post(createThought)

// set up GET one and Update by id - '/api/thought/:thoughtId'
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

// set up DELETE by id - '/api/thought/:userId/thoughtId'
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought)

// set up POST create reaction - '/api/thought/:thoughtId/reaction'
router
    .route('/:thoughtId/reaction')
    .post(createReaction)
    
// set pu DELETE reaction - '/api/:thoughtId/reaction/:reactionId'
router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(deleteReaction)

module.exports = router    


