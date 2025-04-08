import { FastifyInstance } from "fastify";
import { criarPlanoController,listarPlanoController } from "../controllers/planoController";
import { authenticate, authorizeMedico } from "../middlewares/authMiddleware";

export const planoRoutes = async (app: FastifyInstance) => {
    app.post('/planos', {preHandler: [authenticate, authorizeMedico]}, criarPlanoController)
    app.get('/planoslist', {preHandler: [authenticate]}, listarPlanoController)
}