const { Router } = require('express')
const express = require('express')
const { 
    createWorkout, 
    getWorkouts, 
    getWorkoutById, 
    deleteWorkoutById, 
    updateWorkoutById
 } = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()
//protect routes, require auth for all workout routes
router.use(requireAuth)

router.route('/')
    .get(getWorkouts)
    .post(createWorkout)

router.route('/:id')
    .get(getWorkoutById)
    .delete(deleteWorkoutById)
    .patch( updateWorkoutById)


module.exports = router