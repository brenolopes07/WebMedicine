import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { register, login } from "../controllers/authController";

const authRoutes = async (app: FastifyInstance,opts: FastifyPluginOptions) =>{
    app.post('/register', register);
    app.post('/login', login);
    
}

export default authRoutes;