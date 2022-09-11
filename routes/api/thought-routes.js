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

// set up GET all and POST thought - '/api/thought'
router.route('/').get(getAllThought).post(createThought)


// set up GET one, Update and DELETE by id - '/api/thought/:thoughtId'
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

    

// set up POST create reaction - '/api/thought/:thoughtId/reaction'
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    
// set pu DELETE reaction - '/api/:thoughtId/reaction/:reactionId'
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router    


