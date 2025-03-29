import { error } from 'console';
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

export const updatePacienteService = async (
  id: string,
  data: {
    name?: string;
    phone?: string;
    adress?: string;
    Planos?: { name: string };
  }
) => {
  let planoId: string | undefined = undefined;


  if (data.Planos?.name) {
    const plano = await prisma.planodeSaude.findUnique({
      where: { name: data.Planos.name },
      select: { id: true }
    });
    planoId = plano?.id;
  }

  const paciente = await prisma.paciente.update({
    where: { userId: id },
    data: {
      name: data.name,
      phone: data.phone,
      adress: data.adress,
      planoId: planoId 
    }
  });

  return paciente;
};


