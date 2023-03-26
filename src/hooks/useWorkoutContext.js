import { useContext } from "react"
import { WorkoutsContext} from "../context/WorkoutsContext"

const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error("Workout Context must be available before calling it")
  }

  return context
}

export default useWorkoutContext