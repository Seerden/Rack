create table workouts if not exists (
   workout_id serial primary key,
   user_id serial not null,
   name varchar(32) not null,
   description varchar(256),
   
   constraint fk_workout_user 
      foreign key(user_id)
      references users(user)_id
      on delete cascade
);