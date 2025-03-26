import { FastifyRequest, FastifyReply } from "fastify";
import { registerUser, loginUser } from "../services/authService";
import { UserRegisterData } from "../services/authService";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = await registerUser(req.body as UserRegisterData);
        return reply.status(201).send({message: 'Usuario criado com sucesso', user});
    } catch (err) { 
        console.log(err);
        return reply.status(400).send({message: "Erro ao criar usuario"});
    }
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email, password } = req.body as {email: string, password: string};
        const token = await loginUser (email, password);
        return reply.status(200).send({message: 'Usuario logado com sucesso', token});
    } catch (err) {
        return reply.status(400).send({message: "Erro ao logar usuario"});
    }
};