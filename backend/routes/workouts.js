const express = require('express')
const { 
    createWorkout, 
    getWorkouts, 
    getWorkoutById, 
    deleteWorkoutById, 
    updateWorkoutById
 } = require('../controllers/workoutController')

const router = express.Router()

router.route('/')
    .get(getWorkouts)
    .post(createWorkout)

router.route('/:id')
    .get(getWorkoutById)
    .delete(deleteWorkoutById)
    .patch( updateWorkoutById)


module.exports = router