import { pool } from "./db.js"

export async function getPlanItems(planId: number) {
  const result = await pool.query(
    `
    SELECT * FROM workout_plan_items
    WHERE plan_id = $1
    ORDER BY id
    `,
    [planId]
  )

  return result.rows
}

export async function createPlanItem(
  planId: number,
  exercise: string,
  weight: number,
  reps: number,
  sets: number
) {

  const result = await pool.query(
    `
    INSERT INTO workout_plan_items
    (plan_id, exercise, weight, reps, sets)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [planId, exercise, weight, reps, sets]
  )

  return result.rows[0]
}

export async function togglePlanItem(id: number){
    await pool.query(`
    UPDATE workout_plan_items
    SET done = NOT done
    WHERE id = $1
    `,
    [id]
    )
}