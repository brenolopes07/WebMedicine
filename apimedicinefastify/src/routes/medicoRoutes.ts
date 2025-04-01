import { FastifyInstance } from "fastify";
import { buscarMedicoController, profileMedicoController, updateMedicoController,disponibilidadeMedicoController } from "../controllers/medicoController";
import { authenticate, authorizeMedico } from "../middlewares/authMiddleware";

export const medicoRoutes = async (app: FastifyInstance) => {
    app.get('/medicos', buscarMedicoController);
    app.get('/medicos/profile', {preHandler:[authenticate, authorizeMedico]}, profileMedicoController)
    app.put('/medicoupdt', {preHandler: [authenticate, authorizeMedico]}, updateMedicoController)
    app.put('/medico/disp',{preHandler: [authenticate,authorizeMedico]}, disponibilidadeMedicoController)
};