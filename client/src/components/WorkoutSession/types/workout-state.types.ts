import { SessionExercise } from "../../../types/shared/session.types";

export type ActiveWorkout = SessionExercise[];

/*  
   This type ends up like
   {
      '2': { // this key represents an exercise_id
         '20kg': [{reps: 12, timestamp}], // the key represents a weight, the value is an array of {reps, timestamp}}
      },
      '1': {
         '25kg': [{reps: 10, timestamp}, {...}]
      }
   }  
*/
export type SessionEntriesInput = Record<
	number,
	Record<string, { reps: number; timestamp: Date }[]>
>;
