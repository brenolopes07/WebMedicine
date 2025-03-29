import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { profilePacienteController, updatePaciente } from "../controllers/pacienteController";
import { authenticate, authorizePaciente, authorizeMedico } from "../middlewares/authMiddleware";


export const pacienteRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    app.get('/paciente/profile',{ preHandler: [authenticate]}, profilePacienteController);
    app.put('/paciente',{ preHandler: [authenticate]}, updatePaciente);
}