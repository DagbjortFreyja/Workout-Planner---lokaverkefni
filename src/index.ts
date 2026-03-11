import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { getWorkouts } from './db/workouts.js'
import { createWorkout } from './db/workouts.js'

const app = new Hono()

app.get("/", async (c) => {
  const workouts = await getWorkouts()

  return c.html(`
    <h1>Workout Log</h1>

    <form method="POST" action="/workouts">
      <input name="exercise" placeholder="Exercise" />
      <input name="weight" placeholder="Weight" />
      <input name="reps" placeholder="Reps" />
      <button>Add workout</button>
    </form>

    <h2>Workouts</h2>

    <ul>
      ${workouts
        .map(
          (w) =>
            `<li>${w.exercise} — ${w.weight}kg x ${w.reps}</li>`
        )
        .join("")}
    </ul>
  `)
})

app.post("/workouts", async (c) => {
  const body = await c.req.parseBody()

  const exercise = body.exercise as string
  const weight = Number(body.weight)
  const reps = Number(body.reps)

  await createWorkout(exercise, weight, reps)

  return c.redirect("/")
})

export default app;

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
