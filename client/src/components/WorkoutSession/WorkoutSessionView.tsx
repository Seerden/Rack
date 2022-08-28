import useWorkoutSessionData from "./hooks/useWorkoutSessionData";
import WorkoutSession from "./WorkoutSession";

export default function WorkoutSessionView() {
	const { workout, session, sessionEntries } = useWorkoutSessionData();
	if (!workout || !session?.length || !sessionEntries) return <></>;

	return (
		<WorkoutSession
			workout={workout}
			session={session}
			sessionEntries={sessionEntries}
		/>
	);
}
