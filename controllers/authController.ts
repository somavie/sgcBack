import { Request, Response } from "express";
import authService from "../services/authService";

const login = async (req: Request, res: Response) => {
  try {
    const { usuarioNome, senha } = req.body;
    const token = await authService.login(usuarioNome, senha);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { usuarioNome, senha } = req.body;
    await authService.register(usuarioNome, senha);
    res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
};

export default {
  login,
  register,
};
