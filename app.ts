import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { pool } from "./utils/database";

// Configurar dotenv
dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

const checkDatabaseConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    return true;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    return false;
  }
};

const startServer = async () => {
  const isDBConnected = await checkDatabaseConnection();
  if (isDBConnected) {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } else {
    console.error(
      "Não foi possível conectar ao banco de dados. O servidor não será iniciado."
    );
    process.exit(1);
  }
};

startServer();
