import { Pool } from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/database"; // Importação nomeada

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "your_secret_key";

// Função para registrar um novo usuário
const register = async (usuarioNome: string, senha: string) => {
  const hashedPassword = await bcrypt.hash(senha, saltRounds);

  try {
    const [result] = await pool.query(
      "INSERT INTO usuario (usuarioNome, senha) VALUES (?, ?)",
      [usuarioNome, hashedPassword]
    );
    return result;
  } catch (error) {
    throw new Error("Falha ao criar o usuário: " + (error as Error).message);
  }
};

// Função para autenticar um usuário
const login = async (usuarioNome: string, senha: string) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, senha FROM usuario WHERE usuarioNome = ?",
      [usuarioNome]
    );

    if ((rows as any).length === 0) {
      throw new Error("Usuário não encontrado");
    }

    const user = (rows as any)[0];
    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      throw new Error("Senha incorreta");
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
    return token;
  } catch (error) {
    throw new Error("Falha na autenticação: " + (error as Error).message);
  }
};

export default {
  register,
  login,
};
