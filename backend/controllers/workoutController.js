const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//  @desc   Get all workouts
//  @route  GET /api/workouts
//  @access Private
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({createdAt:-1})

    res.status(200).json(workouts)
}

//  @desc   Create new workout
//  @route  POST /api/workouts
//  @access Private
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
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