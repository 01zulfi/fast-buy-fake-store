"use server";

import { cookies } from "next/headers";
import pool from "./db";
import { redirect } from "next/navigation";

export default async function logout() {
  const sessionId = cookies().get("session")?.value ?? null;

  if (!sessionId) {
    return;
  }

  cookies().set("session", "");

  await pool.query("UPDATE session SET expires = 0 WHERE session_id = $1", [
    sessionId,
  ]);

  redirect("/login");
}