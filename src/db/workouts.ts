import { pool } from "./db.js";

export async function getWorkouts() {
  const result = await pool.query(`
    SELECT * FROM workouts
    ORDER BY created_at DESC
  `);

  return result.rows;
}

export async function createWorkout(
  exercise: string,
  weight: number,
  reps: number
) {
  const result = await pool.query(
    `
    INSERT INTO workouts (exercise, weight, reps)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [exercise, weight, reps]
  )

  return result.rows[0]
}
