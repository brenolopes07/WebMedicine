import { FastifyInstance } from "fastify";
import { consultaPdfController } from "../controllers/consultaPdfController";

export const consultaPdfRoutes = async (app: FastifyInstance) =>{
    app.get("/consultas/:id/pdf", consultaPdfController);
}