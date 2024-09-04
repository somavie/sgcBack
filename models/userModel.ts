import { pool } from "../utils/database";

interface User {
  id?: number;
  usuarioNome: string;
  senha: string;
}

export const createUser = async (user: User) => {
  const [result] = await pool.query(
    "INSERT INTO users (usuarioNome, senha) VALUES (?, ?)",
    [user.usuarioNome, user.senha]
  );
  return result;
};

export const getUserByUsername = async (usuarioNome: string) => {
  const [rows] = await pool.query(
    "SELECT * FROM usuario WHERE usuarioNome = ?",
    [usuarioNome]
  );
  return rows[0];
};
