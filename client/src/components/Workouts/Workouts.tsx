import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SubTitle, Title } from "../../helpers/theme/snippets/Title";
import useWorkouts from "./hooks/useWorkouts";
import WorkoutCard from "./sub/WorkoutCard";
import * as S from "./Workouts.style";

export default function Workouts() {
	const { workouts } = useWorkouts();

	return (
		<S.Page>
			<Title>Workouts overview</Title>

			{(!workouts || workouts.length === 0) && (
				<p>
					You don't have any workout routines yet.{" "}
					<Link to="/workout/new">Create a workout</Link> to get started!
				</p>
			)}

			{workouts && workouts?.length > 0 && (
				<section>
					<S.Header>
						<SubTitle>Workouts</SubTitle>
						<Link to="/workout/new" title="Create a new workout">
							<FaPlusCircle size={20} fill="#999" />
						</Link>
					</S.Header>
					<S.WorkoutList>
						{workouts.map((w) => (
							<WorkoutCard key={w.workout_id} workout={w} />
						))}
					</S.WorkoutList>
				</section>
			)}
		</S.Page>
	);
}
