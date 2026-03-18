import { pool } from "./db.js";

export async function getWorkoutPlans(){
    const result = await pool.query(`
    SELECT * FROM workout_plans
    ORDER BY created_at DESC
  `)

  return result.rows
}

export async function createWorkoutPlan(name: string){
    const result = await pool.query(
    `
    INSERT INTO workout_plans (name)
    VALUES ($1)
    RETURNING *
    `,
    [name]
    )

    return result.rows[0]
}