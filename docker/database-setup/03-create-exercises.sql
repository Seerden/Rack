create table if not exists exercises (
   exercise_id serial primary key,
   exercise_name varchar(32) not null,
   sets int not null,
   reps int not null,
   starting_weight numeric(6,2) not null,
   weight_progression numeric(5,2) not null,
   weight_unit weight_units not null,

   constraint fk_exercise_workout
      foreign key(workout_id)
      references workouts(workout_id)
      on delete cascade
);