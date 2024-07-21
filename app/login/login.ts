"use server";

import pool from "@/lib/db";
import { Session } from "@/lib/types";
import { randomId } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function login(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const request = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [request.email]);

  if (existingUser.rows.length === 0) {
    return { message: "Incorrect username or password", error: true };
  }

  const validPassword = existingUser.rows[0].password === request.password;

  if (!validPassword) {
    return { message: "Incorrect username or password", error: true };
  }

  const session: Session = {
    sessionId: randomId(),
    userId: existingUser.rows[0].id,
    expires: Date.now() + 1000 * 60 * 60,
  };

  await pool.query(
    "INSERT INTO session (session_id, user_id, expires) VALUES ($1, $2, $3)",
    [session.sessionId, session.userId, session.expires]
  )

  cookies().set("session", String(session.sessionId), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(session.expires),
  });

  redirect("/");
}

interface ActionResult {
  message: string;
  error: boolean;
}