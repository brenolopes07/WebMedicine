import Fastify, { fastify } from "fastify";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { pacienteRoutes } from "./routes/pacienteRoutes";
import { medicoRoutes } from "./routes/medicoRoutes";
import { consultaRoutes } from "./routes/consultaRoutes";


const app = fastify();

dotenv.config();

app.register (authRoutes);
app.register (pacienteRoutes);
app.register (medicoRoutes);
app.register(consultaRoutes);


// Iniciar o servidor
const start = async () => {
  try {
    await app.listen({ port: 4000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    console.log(err);
  }
};

start();
