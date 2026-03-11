import { describe, it, expect } from "vitest"
import { createWorkout } from "../db/workouts.js"

describe("workouts", () => {

  it("creates workout", async () => {

    const workout = await createWorkout(
      "Test Exercise",
      50,
      10
    )

    expect(workout.exercise).toBe("Test Exercise")

  })

})
