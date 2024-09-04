import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

// Rota para registrar um novo usuário
router.post("/register", authController.register);

// Rota para autenticar um usuário
router.post("/login", authController.login);

export default router;
