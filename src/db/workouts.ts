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
  reps: number,
  sets: number
) {
  const result = await pool.query(
    `
    INSERT INTO workouts (exercise, weight, reps, sets)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [exercise, weight, reps, sets]
  )

  return result.rows[0]
}

export async function deleteWorkout(id: number) {
  await pool.query( 
    `
    DELETE FROM workouts
    WHERE id = $1
    `,
    [id]
  )
}
