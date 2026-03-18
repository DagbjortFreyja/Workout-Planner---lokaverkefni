type Workout = {
  id: number
  exercise: string
  weight: number
  reps: number
  sets: number
}

export const Index = ({ workouts }: { workouts: Workout[] }) => {
  return (
    <html>
      <head>
        <title>Workout Log</title>

        <style>{`
          body {
            font-family: system-ui, sans-serif;
            background: #f6f7fb;
            margin: 0;
            padding: 40px;
          }

          .container {
            max-width: 900px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          form {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
          }

          button {
            padding: 10px 14px;
            border: none;
            border-radius: 6px;
            background: #6366f1;
            color: white;
            cursor: pointer;
          }

          button:hover {
            background: #4f46e5;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }

          .delete-btn {
            background: #ef4444;
          }

          .delete-btn:hover {
            background: #dc2626;
          }

          .form-row {
            display: flex;
            gap: 10px;
            align-items: center;
          }

         .form-row input {
            flex: 1;
          }

         .form-row button {
            background: #6366f1;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 16px;
            cursor: pointer;
          }
        .workout-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            margin-top: 10px;
            border-radius: 10px;
            background: #f9fafc;
            border: 1px solid #eee;
            }

        .workout-info {
            display: flex;
            flex-direction: column;
            }

        .exercise {
            font-weight: 600;
            font-size: 16px;
            }

        .sets {
            color: #666;
            font-size: 14px;
            }

        .delete-btn {
            background: #ef4444;
            padding: 8px 12px;
            border-radius: 6px;
            }
        .nav {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            }

        .plans-btn {
            background: #22c55e;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            }

        .plans-btn:hover {
            background: #16a34a;
            }

        `}</style>
      </head>

      <body>
        <div class="container">
          <h1>🏋️ Workout Tracker</h1>
          <div class="nav">
            <a href="/plans" class="plans-btn">Workout Plans</a>
          </div>

          <form method="post" action="/workouts" class="form-row">
            <input name="exercise" placeholder="Exercise" />
            <input name="weight" placeholder="Weight" />
            <input name="reps" placeholder="Reps" />
            <input name="sets" placeholder="Sets"/>
            <button class="add-btn">Add</button>
          </form>

          <h2>Workouts</h2>

          <ul>
            {workouts.map((w) => (
              <li class="workout-item">
                <div class="workout-info">
                    <span class="exercise">{w.exercise}</span>
                    <span class="sets">{w.weight}kg   {w.reps} × {w.sets}</span>
                </div>
                <form method="post" action="/delete">
                  <input type="hidden" name="id" value={w.id} />
                  <button class="delete-btn">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  )
}
