import React, { createContext, useReducer, useEffect } from 'react'
import useAuthContext from '../hooks/useAuthContext'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})
    const { dispatch: loginDispatch } = useAuthContext()

    useEffect(() => {
      const user = localStorage.getItem("user");

      if (user) {
        loginDispatch({ type: "LOGIN", payload: user });
      }
    }, [loginDispatch]);

  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
        {children}
    </WorkoutsContext.Provider>
  )
}

export default WorkoutsContextProvider