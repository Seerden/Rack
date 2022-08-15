import { useMemo } from "react";
import { useParams } from "react-router";
import { useQueryWorkoutById } from "../../../helpers/fetch/workouts/useQueryWorkoutById";

export default function useWorkoutSession() {
	const params = useParams();

	const { data } = useQueryWorkoutById(+(params.workout_id ?? 0));
	const workout = useMemo(() => {
		return data?.workout;
	}, [data]);

	return { workout } as const;
}
