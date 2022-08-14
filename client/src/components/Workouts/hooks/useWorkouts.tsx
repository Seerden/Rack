import useQueryWorkoutsByUser from "../../../helpers/fetch/workouts/useQueryWorkouts";

export default function useWorkouts() {
	const { data } = useQueryWorkoutsByUser();
	const workouts = data?.workouts;

	return { workouts } as const;
}
