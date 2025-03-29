import { FastifyRequest, FastifyReply } from "fastify";
import { buscarMedicoService, profileMedicoService } from "../services/medicoService";

export const buscarMedicoController = async (req: FastifyRequest < {Querystring: {q:string } }>, res: FastifyReply) => {
    const medicos = await buscarMedicoService(req.query.q);
    if(medicos.length === 0){
        return res.status(404).send({message: 'Nenhum medico encontrado'});
    }
    return res.status(200).send(medicos);
}

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
}