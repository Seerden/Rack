create table if not exists workouts (
   workout_id serial primary key,
   user_id serial not null,
   name varchar(32) not null,
   description varchar(256),
   
   constraint fk_workout_user 
      foreign key(user_id)
      references users(user_id)
      on delete cascade
);