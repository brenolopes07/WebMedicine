import { FastifyRequest, FastifyReply } from 'fastify';
import { criarPlanoService, listarPlanoService } from '../services/planoService';

export const criarPlanoController = async (req: FastifyRequest,  res: FastifyReply)=>{
    try {
        const { name } = req.body as { name: string };
        const plano = await criarPlanoService(name);
        return res.status(201).send({message: "Plano registrado com sucesso"})
    } catch (error){
        console.error(error);
        return res.status(400).send({message: "Erro ao registrar plano"});
    }
}

export const listarPlanoController = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const planos = await listarPlanoService();
        return res.status(200).send(planos);
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Erro ao listar planos"});
    }
}