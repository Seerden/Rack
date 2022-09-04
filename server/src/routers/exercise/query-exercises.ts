import { Exercise } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

export async function queryExercisesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return await sql<Exercise[]>`
      select * from exercises where user_id = ${user_id}
   `;
}
