import Fastify, { fastify } from "fastify";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { pacienteRoutes } from "./routes/pacienteRoutes";
import { medicoRoutes } from "./routes/medicoRoutes";
import { consultaRoutes } from "./routes/consultaRoutes";
import { planoRoutes } from "./routes/planoRoutes";
import { consultaPdfRoutes } from "./routes/consultaPdfRoutes";


const app = fastify();

dotenv.config();

app.register (authRoutes);
app.register (pacienteRoutes);
app.register (medicoRoutes);
app.register(consultaRoutes);
app.register(planoRoutes);
app.register(consultaPdfRoutes);


// Iniciar o servidor
const start = async () => {
  try {
    await app.listen({ port: 5000 });
    console.log("Server running on http://localhost:5000");
  } catch (err) {
    console.log(err);
  }
};

start();
