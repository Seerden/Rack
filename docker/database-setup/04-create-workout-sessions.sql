create table if not exists workout_sessions (
   workout_session_id serial primary key,
   workout_id serial not null references workouts(workout_id) on delete set null,
   created_at timestamp default now(),
   started_at timestamp not null,
   completed_at timestamp default now(),
   duration int generated always as 
      (extract(epoch from (completed_at - started_at)::interval))
       stored
);
