import { FastifyRequest, FastifyReply } from "fastify";
import { getPacienteService, updatePacienteService } from "../services/pacienteService";

export const getpaciente = async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.user?.id;
    try{
        if (!userId) {
            throw new Error("UserId nao encontrado");
        }
        const paciente = await getPacienteService(userId);
        return reply.status(200).send(paciente);        
    } catch(err){
        return reply.status(400).send({message: "Erro ao buscar paciente"});
    }
};

export const updatePaciente = async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.user?.id;
    const data = req.body;
    try{
        if (!userId || !data) {
            throw new Error("UserId nao encontrado ou dados nao informados");
        }
        const paciente = await updatePacienteService(userId, data);
        return reply.status(200).send(paciente);
    }  catch(err){
        return reply.status(400).send({message: "Erro ao atualizar os dados do paciente"});
    }
};