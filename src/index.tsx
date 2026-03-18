import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { deleteWorkout, getWorkouts } from './db/workouts.js'
import { createWorkout } from './db/workouts.js'
import { Index } from './views/index.js'
import { getWorkoutPlans, createWorkoutPlan } from './db/workoutPlans.js'
import { getPlanItems, createPlanItem } from './db/workoutPlanItems.js'
import { togglePlanItem } from './db/workoutPlanItems.js'

const app = new Hono()

app.get("/plans/:id", async (c) => {

  const id = Number(c.req.param("id"))

  const items = await getPlanItems(id)

  return c.html(`
    <h1>Workout Plan</h1>

    <form method="post" action="/plans/${id}/items">
      <input name="exercise" placeholder="Exercise" />
      <input name="weight" placeholder="kg" />
      <input name="reps" placeholder="reps" />
      <input name="sets" placeholder="sets" />
      <button>Add exercise</button>
    </form>

    <ul>
      ${items.map((i) => `
        <li>
          <form method="post" action="/plans/items/${i.id}/toggle">
          <input 
            type="checkbox"
            onchange="this.form.submit()"
            ${i.done ? "checked" : ""}
           />

          ${i.exercise} — ${i.weight}kg ${i.reps}×${i.sets}

         </form>
        </li>
      `).join("")}
    </ul>

    <p><a href="/plans">Back</a></p>
  `)

})

app.get("/plans", async (c) => {
  const plans = await getWorkoutPlans()

  return c.html(`
    <h1>Workout Plans</h1>

    <form method="post" action="/plans">
      <input name="name" placeholder="Plan name" />
      <button>Add plan</button>
    </form>

    <ul>
      ${plans.map((p) => `
        <li>
          <a href="/plans/${p.id}">
            ${p.name}
          </a>
        </li>
      `).join("")}
    </ul>

    <p><a href="/">Back to workouts</a></p>
  `)

})

app.get("/", async (c) => {

  const workouts = await getWorkouts()

  return c.html(
    <Index workouts={workouts} />
  )

})

app.post("/workouts", async (c) => {
  const body = await c.req.parseBody()

  const exercise = body.exercise as string
  const weight = Number(body.weight)
  const reps = Number(body.reps)
  const sets = Number(body.sets)

  await createWorkout(exercise, weight, reps, sets)

  return c.redirect("/")
})

app.post("/plans", async (c) => {
  const body = await c.req.parseBody()
  const name = body.name as string

  await createWorkoutPlan(name)

  return c.redirect("/plans")
})

app.post("/delete", async (c) => {
  const body = await c.req.parseBody()
  const id = Number(body.id)

  await deleteWorkout(id)

  return c.redirect("/")
})

app.post("/plans/:id/items", async (c) => {

  const id = Number(c.req.param("id"))
  const body = await c.req.parseBody()

  const exercise = body.exercise as string
  const weight = Number(body.weight)
  const reps = Number(body.reps)
  const sets = Number(body.sets)

  await createPlanItem(id, exercise, weight, reps, sets)

  return c.redirect(`/plans/${id}`)
})

app.post("/plans/items/:id/toggle", async (c) => {

  const id = Number(c.req.param("id"))

  await togglePlanItem(id)

  return c.redirect("back")

})

export default app;

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
