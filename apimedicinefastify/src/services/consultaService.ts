import { prisma } from "../prisma/prisma";


export const criarConsulta = async (data:{
    medicoId: string, 
    dataConsulta: Date,
    userId: string,
})=>{ 
    const paciente = await prisma.paciente.findUnique({
        where: { userId: data.userId },
        select: {id: true,}
    });
    if (!paciente) {
        throw new Error ('Paciente nao encontrado')
    }

    return await prisma.consulta.create({
        data:{
            pacienteId: paciente.id,
            MedicoId: data.medicoId,
            dataConsulta: data.dataConsulta,
            status: 'AGENDADA',
           
        },
        select:{
            id:true,
            dataConsulta:true,
            status: true,
            medico: {
                select:{ name: true, especialidade: true, price: true,},
            },
            paciente:{ select:{ name: true, phone: true, } },
        }         
    });
};

export const listarConsulta = async (userId: string)=>{
    const paciente = await prisma.paciente.findUnique({
        where: { userId },
        select: { id: true },
    });

    const medico = await prisma.medico.findUnique({
        where: { userId},
        select: { id: true },
    })

    if(!paciente && !medico){
        throw new Error('Usuario nao tem permissao para listar consultas')
    } 

    const filtros = {
        pacienteId: paciente?.id,
        medicoId: medico?.id,
    }

    return await prisma.consulta.findMany({
        where: {
            pacienteId: filtros.pacienteId,
            MedicoId: filtros.medicoId,
        },
        select:{
            id: true, 
            dataConsulta: true,
            status: true,
            medico: {
                select:{
                    name: true,
                    especialidade: true,
                    price: true,
                },
            },
            paciente: {
                select:{
                    name: true,
                    phone: true,
                },
            },
        }
    });
};

export const cancelarConsulta = async (id: string, data:{status: string}) => {
    return await prisma.consulta.update({
        where: {id},
        data:{
            status: data.status,},        
    })
}