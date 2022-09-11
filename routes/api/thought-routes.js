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


// set up GET all and POST thoughts - '/api/thoughts'
router.route('/').get(getAllThought).post(createThought)


// set up GET one, Update  by id - '/api/thoughts/:thoughtId'
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)


// set up POST create reaction - '/api/thoughts/:thoughtId/reaction'
router
    .route('/:thoughtId/reactions')
    .post(createReaction)

// set pu DELETE reaction - '/api/:thoughtId/reactions/:reactionId'
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router


