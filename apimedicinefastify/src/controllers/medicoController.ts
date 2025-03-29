import { FastifyRequest, FastifyReply } from "fastify";
import { buscarMedicoService, profileMedicoService, updateMedicoService } from "../services/medicoService";

export const buscarMedicoController = async (req: FastifyRequest < {Querystring: {q:string } }>, res: FastifyReply) => {
    const medicos = await buscarMedicoService(req.query.q);
    if(medicos.length === 0){
        return res.status(404).send({message: 'Nenhum medico encontrado'});
    }
    return res.status(200).send(medicos);
};

export const profileMedicoController = async (req: FastifyRequest, res: FastifyReply) => {
    const userId = req.user?.id;
    try{
        if(!userId){
            throw new Error('UserId nao encontrado')
        }
        const medico = await profileMedicoService(userId);
        return res.status(200).send(medico)
    } catch(err){
        return res.status(400).send({message:"Nao foi possivel acessar seu Perfil"})
    }
};


export const updateMedicoController = async (req: FastifyRequest, res: FastifyReply) => {
    const userId = req.user?.id;
    const data = req.body;
    try{
        if(!userId || !data) {
            throw new Error ('UserId nao encontrato ou dados nao informados')
        }
        const medico = await updateMedicoService (userId, data);
        return res.status(200).send (medico)
    } catch(err){
        return res.status(400).send({message: "Erro ao atualizar os dados!"})
    }
}