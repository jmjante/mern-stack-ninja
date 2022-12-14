const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//  @desc   Get all workouts
//  @route  GET /api/workouts
//  @access Private
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({})

    res.status(200).json(workouts)
}

//  @desc   Create new workout
//  @route  POST /api/workouts
//  @access Private
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//  @desc   Get a workout
//  @route  GET /api/workouts
//  @access Private
const getWorkoutById = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }

    res. status(200).json(workout)
}



//  @desc   Delete a workout
//  @route  GET /api/workouts
//  @access Private
const deleteWorkoutById = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }

    res. status(200).json(workout)

}


//  @desc   Update a workout
//  @route  GET /api/workouts
//  @access Private
const updateWorkoutById = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    },{new: true})
    
    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }

    res. status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutById, 
    deleteWorkoutById, 
    updateWorkoutById
}