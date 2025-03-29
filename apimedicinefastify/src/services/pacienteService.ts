import { prisma } from '../prisma/prisma';

export const profilePacienteService = async (id: string) => {
    const paciente = await prisma.paciente.findUnique({
        where: {userId: id},
        select: {
            name:true,
            phone: true,
            adress:true,
            Plano:true,
            createdAt:true,
        }
    });

    if(!paciente){
        throw new Error('Paciente nao encontrado');
    }
    return paciente;
};

export const updatePacienteService = async (id: string, data: {
    name?: string;
    phone?: string;
    adress?: string;
    planoId?: string;
}) =>{
        const paciente = await prisma.paciente.update({
            where: {userId: id},
            data,
    });

return paciente;

}
