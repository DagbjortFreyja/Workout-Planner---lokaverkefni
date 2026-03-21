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
  const total = items.length
  const done = items.filter(i => i.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return c.html(`

  <div style="max-width:600px; margin:40px auto; background:white; padding:20px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">

    <h1>Workout Plan 💪</h1>

    <p style="font-weight:600; margin-top:10px;">
      ${percent}% completed
    </p>
    <p>${done} / ${total} exercises done</p>

    ${percent === 100 ? `
  <div style="
    background:#dcfce7;
    color:#166534;
    padding:10px;
    border-radius:8px;
    margin-bottom:10px;
    font-weight:600;
  ">
    🎉 Workout complete!
  </div>
` : ""}

<div style="background:#eee; border-radius:8px; overflow:hidden; height:20px;">
  <div style="width:${percent}%; background:linear-gradient(to right, #22c55e, #4ade80); height:100%;"></div>
</div>

    <form method="post" action="/plans/${id}/items" 
  style="display:grid; grid-template-columns: 1fr 100px 100px 100px auto; gap:10px; margin-top:20px;">

  <input name="exercise" placeholder="Exercise" style="padding:10px; border-radius:8px; border:1px solid #ddd;" />
  <input name="weight" placeholder="kg" style="padding:10px; border-radius:8px; border:1px solid #ddd;" />
  <input name="reps" placeholder="reps" style="padding:10px; border-radius:8px; border:1px solid #ddd;" />
  <input name="sets" placeholder="sets" style="padding:10px; border-radius:8px; border:1px solid #ddd;" />

  <button style="
    background:#6366f1;
    color:white;
    border:none;
    padding:10px 14px;
    border-radius:8px;
    font-weight:600;
    cursor:pointer;
  ">
    +
  </button>

</form>

    <ul style="list-style:none; padding:0; margin-top:20px;">
      ${items.map((i) => `
        <li style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:14px;
        margin-top:12px;
        background:white;
        border-radius:12px;
        border:1px solid #eee;
        box-shadow:0 4px 12px rgba(0,0,0,0.05);
        ${i.done ? "background:#f3f4f6;" : ""}
        ">
          <div style="display:flex; align-items:center; gap:12px;">

          <form method="post" action="/plans/items/${i.id}/toggle">
          <input 
          type="checkbox"
          onchange="this.form.submit()"
          ${i.done ? "checked" : ""}
          style="width:18px; height:18px;"
        />
      </form>

      <div>
      <div style="font-weight:600; font-size:16px;">
      ${i.exercise}
      </div>

      <div style="color:#666; font-size:14px;">
        ${i.weight}kg × ${i.reps} × ${i.sets}
       </div>
      </div>

    </div>
        </li>
      `).join("")}
    </ul>

    <p><a href="/plans">Back</a></p>
    </div>
  `)

})

app.get("/plans", async (c) => {
  const plans = await getWorkoutPlans()

  return c.html(`
    <div style="max-width:600px; margin:40px auto; background:white; padding:20px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">

    <h1 style="text-align:center;">📋 Workout Plans</h1>

    <form method="post" action="/plans" style="display:flex; gap:10px; margin-top:20px;">
      <input name="name" placeholder="Plan name" style="flex:1; padding:8px;" />
      <button style="background:#6366f1; color:white; border:none; padding:8px 12px; border-radius:6px;">
        Add
      </button>
    </form>

    <ul style="list-style:none; padding:0; margin-top:20px;">
      ${plans.map((p) => `
        <li style="
        margin-top:10px;
        padding:12px;
        background:#f9fafc;
        border-radius:10px;
        border:1px solid #eee;
        ">

  <a href="/plans/${p.id}" style="
    text-decoration:none;
    color:black;
    font-weight:500;
    display:flex;
    justify-content:space-between;
  ">

    ${p.name}

    <span>→</span>

  </a>

</li>
      `).join("")}
    </ul>

    <p><a href="/">Back to workouts</a></p>
    </div>
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

  const referer = c.req.header("referer") || "/plans"
  return c.redirect(referer)

})

export default app;

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
