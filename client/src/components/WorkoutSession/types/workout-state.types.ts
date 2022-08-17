import { WeightUnit } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";

export type ExerciseScheme = {
	weight: number;
	weight_unit: WeightUnit;
	sets: number;
	reps: number;
	isWarmup?: boolean;
};

export type SessionExercise = {
	exercise_id: ID;
	session: ExerciseScheme[]; // currently we only allow one working weight, but for things like 5/3/1, having a structure like this from the start is very beneficial
};

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
