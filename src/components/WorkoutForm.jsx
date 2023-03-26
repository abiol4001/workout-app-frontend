import React, { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workoutPost = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(workoutPost),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Excercise Title: </label>
        <input
          type="text"
          name="title"
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes('title') ? "error" : ""}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          name="load"
          id=""
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes('load') ? "error" : ""}
        />
        <label>Reps:</label>
        <input
          type="number"
          name="reps"
          id=""
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes('reps') ? "error" : ""}
        />
        <button>Add</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WorkoutForm;
