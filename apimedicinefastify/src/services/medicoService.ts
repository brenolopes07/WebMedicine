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
        horarioFim: true,
        horarioInicio:true,
        diasAtendimento:true,
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
            Planos: true,
            horarioInicio: true,
            horarioFim: true,
            diasAtendimento: true,
            createdAt: true,
            price: true,
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
    price?: string,
    Planos?:{name: string}[],
}) => {
    const planosID = await prisma.planodeSaude.findMany({
        where: {name:{ in: data.Planos?.map(plano=> plano.name) || []}},
        select: {id: true }
    });

    const medico = await prisma.medico.update({
        where: {userId:id},
        data:{
            name: data.name,
            phone: data.phone,
            especialidade: data.especialidade,
            price: data.price,
            Planos: {
                connect:planosID.map(plano=>({id:plano.id}))
            }
        },
        include: {
            Planos: true,
        },
    });

    return medico;
}

export const disponibilidadeMedico = async (id: string,
    data: {
        horarioInicio?: string,
        horarioFim?:string, 
        diasAtendimento?:string[],
    }
) => {
    const disponibilidade = await prisma.medico.update({
        where: {userId: id},
        data:{
            horarioFim: data.horarioFim,
            horarioInicio: data.horarioInicio,
            diasAtendimento: data.diasAtendimento
        }
    });

    return disponibilidade;

}
   
    

