import React from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useAuthContext from '../hooks/useAuthContext';

const Workout = ({workout}) => {

  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>
        <strong>Load (in kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
}

export default Workout