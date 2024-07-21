"use server";

import pool from "@/lib/db";

export default async function register(
  _: { message: string },
  formData: FormData
): Promise<{ message: string; error: boolean }> {
  const request = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const existingEmail = await pool.query("SELECT * FROM users WHERE email = $1", [request.email]);

  if (existingEmail.rows.length > 0) {
    return { message: "Email already registered", error: true };
  }

  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [request.username, request.email, request.password]
  );

  return { message: "success", error: false };
}