import { FastifyInstance } from "fastify";
import { cancelarConsultaController, criarConsultaController, listarConsultaController } from "../controllers/consultaController";
import { authenticate, authorizeMedico, authorizePaciente, authPaciente } from "../middlewares/authMiddleware";

export const consultaRoutes = async (app: FastifyInstance) => {
    app.post('/consulta',{preHandler: [authenticate, authorizePaciente]}, criarConsultaController);   
    app.get('/consultalist', {preHandler: [authenticate]}, listarConsultaController);
    app.put('/cancelarconsulta', {preHandler: [authenticate, authorizeMedico]}, cancelarConsultaController);   
}