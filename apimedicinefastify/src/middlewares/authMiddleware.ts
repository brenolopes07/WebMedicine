import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET não foi definido");
}

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string; role: "PACIENTE" | "MEDICO" };
  }
}

// Middleware de autenticação básica
export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET) as {
      id: string;
      role: "PACIENTE" | "MEDICO";
    };

    request.user = decoded;
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido" });
  }
};

// Middleware de autorização para médicos
export const authorizeMedico = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!request.user || request.user.role !== "MEDICO") {
    return reply
      .status(403)
      .send({ message: "Acesso permitido apenas para médicos" });
  }
};

// Middleware de autorização para pacientes
export const authorizePaciente = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!request.user || request.user.role !== "PACIENTE") {
    return reply
      .status(403)
      .send({ message: "Acesso permitido apenas para pacientes" });
  }
};

export const authMedico = [authenticate, authorizeMedico];
export const authPaciente = [authenticate, authorizePaciente];
