create table if not exists workout_exercises (
   workout_id serial not null references workouts(workout_id),
   exercise_id serial not null references exercises(exercise_id),
   unique(workout_id, exercise_id),
   primary key(workout_id, exercise_id)
)