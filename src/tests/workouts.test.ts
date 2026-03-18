import { describe, it, expect } from "vitest"
import { createWorkout, getWorkouts } from "../db/workouts.js"
import { deleteWorkout } from "../db/workouts.js"

describe("workouts", () => {

  it("creates workout", async () => {

    const workout = await createWorkout(
      "Test Exercise",
      50,
      10,
      2
    )

    expect(workout.exercise).toBe("Test Exercise")

  })

  it("deletes workout", async () => {
    const workout = await createWorkout(
      "Delete Test",
      60,
      8,
      2
    )

    await deleteWorkout(workout.id)

    const workouts = await getWorkouts()

    const found = workouts.find(w => w.id === workout.id)

    expect(found).toBeUndefined()
  })

})

