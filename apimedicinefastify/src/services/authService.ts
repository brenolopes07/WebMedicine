import bscrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/prisma';

const SECRET = process.env.JWT_SECRET;

if(!SECRET){
    throw new Error('JWT_SECRET nao foi definido');
}

export interface UserRegisterData {
    email:string
    password:string;
    role: "PACIENTE" | "MEDICO";
    name: string;
    phone?: string;
    adress?: string;
    crm?: string; 
    especialidade?: string;
    horarioInicio?: string;
    horarioFim?: string;
    diasAtendimento?: string;
}

export const registerUser = async (data: UserRegisterData) => {
    const {email, password, role, name, phone, adress, crm, especialidade, horarioInicio, horarioFim, diasAtendimento} = data;

    const existingUser = await prisma.user.findUnique({
        where: {email}
    });
    
    if(existingUser){
        throw new Error('Email ja cadastrado');
    }

    const hashedPassword = await bscrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {email, password: hashedPassword, role}
    });

    if(role === "PACIENTE"){
        if(!phone || !adress || !name)
            throw new Error('Telefone, Endereco, Nome sao dados obrigatorios');    

            await prisma.paciente.create({
                data: {name, phone, adress, userId: user.id,}
            })
    } else if (role === "MEDICO"){
        if(!name || !crm || !phone || !especialidade)
            throw new Error('Nome, CRM, Telefone, Especialidade sao dados obrigatorios');

        await prisma.medico.create({
            data: {name, crm, phone, especialidade,userId: user.id, horarioInicio: "08:00", horarioFim: "18:00", diasAtendimento: ["SEGUNDA", "TERCA", "QUARTA"]},
        });
    }

    return user;
}

    export const loginUser = async (email: string, password: string) => {
         const user = await prisma.user.findUnique({where: {email}});
           if (!user || !(await bscrypt.compare(password, user.password))) {
            throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign({id: user.id, role: user.role}, SECRET, {expiresIn: '1d'});

    
    return { token, role: user.role};
};
