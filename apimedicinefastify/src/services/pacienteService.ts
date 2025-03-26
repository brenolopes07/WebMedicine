import { prisma } from '../prisma/prisma';

export const getPacienteService = async (id: string) => {
    const paciente = await prisma.paciente.findUnique({
        where: {userId: id},
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
