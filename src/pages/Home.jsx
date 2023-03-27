import React, { useEffect, useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";

// components
import Workout from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [toggle, setToggle ] = useState(false)

  useEffect(() => {
    const getWorkouts = async () => {
      const response = await fetch(
        "https://gymflow-api.onrender.com/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    getWorkouts();
  }, [user.token, dispatch]);

  const handleToggle = () => {
    setToggle(prevToggle => !toggle)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-[50px] lg:gap-[100px] md:row-start-1">
      <div className="col-span-2">
        {workouts &&
          workouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="row-start-1 md:row-auto mb-10">
        <div className="block md:hidden">
          <button className="" onClick={handleToggle}>
            Add new Workout
          </button>
          {toggle && <WorkoutForm />}
        </div>
        <div className="hidden md:block">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
