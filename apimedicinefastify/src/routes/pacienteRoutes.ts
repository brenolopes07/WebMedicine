import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { getpaciente, updatePaciente } from "../controllers/pacienteController";
import { authenticate, authorizePaciente, authorizeMedico } from "../middlewares/authMiddleware";


export const pacienteRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    app.get('/paciente',{ preHandler: [authenticate]}, getpaciente);
    app.put('/paciente',{ preHandler: [authenticate]}, updatePaciente);
}