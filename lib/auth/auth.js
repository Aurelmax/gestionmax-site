// lib/auth/auth.js
import bcrypt from "bcrypt"
import pool from "../../lib/db"

export async function findUserByUsername(username) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur:", error)
    throw error
  }
}

export async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash)
}
