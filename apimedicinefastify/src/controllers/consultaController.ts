import { FastifyReply, FastifyRequest } from "fastify";
import { criarConsulta, listarConsulta,cancelarConsulta } from "../services/consultaService";

export const criarConsultaController = async (req: FastifyRequest, res: FastifyReply) =>{
    try{
        const userId: string | undefined = req.user?.id;
        const {medicoId, dataConsulta} = req.body as {medicoId: string, dataConsulta: Date};

        if(!medicoId || !dataConsulta){
            return res.status(400).send({message: 'Dados incompletos'});
        }

        if (!userId) {
            return res.status(400).send({ message: 'Usuário não autenticado' });
        }
        const consulta = await criarConsulta({medicoId, dataConsulta: dataConsulta, userId});
        return res.status(201).send(consulta);
        } catch (error) {
            return res.status(400).send(console.error(error));
                }
        };


export const listarConsultaController = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const userId: string | undefined = req.user?.id;
        if (!userId){
            return res.status(401).send({ message: 'Usuário não autenticado' });
        }

    const consultas = await listarConsulta(userId);
    return res.status(200).send(consultas);
    }catch (err){
        console.error(err);
        return res.status(500).send({ message: 'Erro ao listar consultas' });

    }
}

export const cancelarConsultaController = async (req: FastifyRequest, res: FastifyReply) => {
    try{
        const { id } = req.body as { id: string };
        const data = req.body as { status: string };

        if(!id || !data ){
            res.status(400).send({message: 'Dados incompletos'});           
        }
        const consulta = await cancelarConsulta (id, data);
        return res.status(200).send({message: 'Consulta cancelada com sucesso'});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Erro ao cancelar consulta' });
    }
};


