import { describe, it, expect } from "vitest"
import { createWorkout, getWorkouts } from "../db/workouts.js"
import { deleteWorkout } from "../db/workouts.js"
import { create } from "domain"

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

  it("gets workouts", async () => {

    await createWorkout("Get Test", 40, 12, 3)

    const workouts = await getWorkouts()

    expect(workouts.length).toBeGreaterThan(0)
  })

  it("returns correct data", async () => {

    const workout = await createWorkout("Check Data", 70, 5, 3)
    const workouts = await getWorkouts()
    const found = workouts.find(w => w.id === workout.id)

    expect(found?.weight).toBe(70)
    expect(found?.reps).toBe(5)
    expect(found?.sets).toBe(3)

  })

})

