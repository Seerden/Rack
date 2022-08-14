create table if not exists workout_sessions (
   workout_session_id serial primary key,
   workout_id serial not null references workouts(workout_id),
   created_at timestamp default now(),
   started_at timestamp not null,
   completed_at timestamp default now(),
   duration interval generated always as (completed_at - started_at) stored
);
