import { prisma } from "../prisma/prisma";


export const criarPlanoService = async (name: string) => {
    if (!name) throw new Error("Nome do plano nao pode ser vazio");
    const existingPlano = await prisma.planodeSaude.findUnique({
        where: { name}
    });
    if(existingPlano){
        throw new Error('Plano ja cadastrado')
    }    
    const plano = await prisma.planodeSaude.create({
        data:{ name }
    })
     return plano;

};

export const listarPlanoService = async () => {
    const planos = await prisma.planodeSaude.findMany();
    return planos;    
}