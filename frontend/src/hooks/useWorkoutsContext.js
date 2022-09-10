import { WorkoutsContext } from '../context/WorkoutContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext) //workoutContext contains the provider wrapper and the value passed across all components

    if (!context) {
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
    }

    return context
}