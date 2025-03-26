import Fastify, { fastify } from "fastify";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { pacienteRoutes } from "./routes/pacienteRoutes";


const app = fastify();

dotenv.config();

app.register (authRoutes);
app.register (pacienteRoutes);


// Iniciar o servidor
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    console.log(err);
  }
};

start();
