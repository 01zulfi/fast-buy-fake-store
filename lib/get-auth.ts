import { cookies } from "next/headers";
import { cache } from "react";
import pool from "./db";

const getAuth = cache(async () => {
	const sessionId = cookies().get("session")?.value ?? null;
	if (!sessionId) {
		return {
			authenticated: false,
		};
	}

	const dbSession = await pool.query(
		"SELECT * FROM session WHERE session_id = $1 LIMIT 1",
		[sessionId]
	);

	if (dbSession.rows.length < 1 || dbSession.rows[0]?.expires < Date.now()) {
		return {
			authenticated: false,
		};
	}

	const user = await pool.query(
		"SELECT * FROM users WHERE id = $1 LIMIT 1",
		[dbSession.rows[0].user_id]
	);
	console.log('dbsession', dbSession.rows[0]);
	console.log("user", user.rows[0]);

	return { authenticated: true, user: user.rows[0] };
});

export default getAuth;