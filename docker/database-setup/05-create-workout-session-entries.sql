create table if not exists workout_session_entries (
   workout_session_id serial not null references workout_sessions(workout_session_id) on delete set null,
   workout_entry_id serial primary key,
   exercise_id serial not null references exercises(exercise_id),
   weight numeric(6,2) not null,
   weight_unit weight_units not null,
   reps int not null,
   failed boolean
);