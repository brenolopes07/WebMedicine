import { prisma } from "../prisma/prisma";

export const buscarMedicoService = async (filtro: string) => {
  return await prisma.medico.findMany({
    where:{
        OR:[
        {name: {contains: filtro, mode: 'insensitive'}},
        {especialidade: {contains: filtro, mode: 'insensitive'}},
        ]
    },
    select:{
        id: true, 
        name: true,
        especialidade: true,
    }
  });
};

export const profileMedicoService = async (id: string) => {
    const medico = await prisma.medico.findUnique ({
        where: {userId: id},
        select:{
            name: true,
            especialidade: true,
            phone: true, 
            crm: true,
            Planos:true,
            horarioInicio: true,
            horarioFim: true,
            diasAtendimento: true,
            createdAt: true,
        }

    });
    if(!medico) {
        throw new Error('Medico nao encontrado')
    }

    return medico;
}



export const updateMedicoService = async (id:string, data:{
    name?:string,
    phone?:string,
    especialidade?:string,
    Planos?:{name: string}[],
}) => {
    const planosID = await prisma.planodeSaude.findMany({
        where: {name:{ in: data.Planos?.map(plano=> plano.name) || []}},
        select: {id: true }
    });

    const medico = await prisma.medico.update({
        where: {userId:id},
        data:{
            ...data,
            Planos: {
                set:planosID.map(plano=>({id:plano.id}))
            }
        }
    });

    return medico;
}
   
    

