import { Link } from "react-router-dom";

export default function Home() {
	return (
		<ul>
			<li>
				<Link to="login">Log in</Link>
			</li>
			<li>
				<Link to="workout/new"> Create a new workout</Link>
			</li>
		</ul>
	);
}
