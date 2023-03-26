import React, { useEffect } from "react";
import useWorkoutContext from '../hooks/useWorkoutContext'

// components
import Workout from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const getWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    };
    getWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="">
        {workouts &&
          workouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
