"use client";

import { Button } from "@/components/ui/button";
import { Book, Pen, Pencil, User } from "lucide-react";
import SearchConsultas from "./SearchConsultasPaciente";

// Primeiro defina a interface/types
type UsuarioPaciente = {
  name?: string;
  especialidade?: string;
  phone: string;
  crm?: string;
  Planos?: string[];
  horarioInicio?: string;
  horarioFim?: string;
  diasAtendimento?: string[];
  createdAt?: string;
  price?: string;
  adress?: string;
  Plano?: string;
};
interface ProfilePacienteProps {
  usuario: UsuarioPaciente | null;
}

export function ProfilePaciente({ usuario }: ProfilePacienteProps) {
  return (
    <>
      <div className="space-y-4 p-6 max-w-xl mx-auto mt-10 flex gap-3 bg-gradient-to-l from-blue-400 to-blue-100  rounded-lg">
        <User className="size-8"></User>
        <h1 className="text-2xl font-bold">Olá, {usuario?.name}</h1>
      </div>
      <div className="space-y-2 mt-5 p-6 max-w-xl mx-auto flex flex-col bg-gradient-to-l from-blue-400 to-blue-100 rounded-lg">
        <div className="flex gap-2 items-center mb-4">
          <Book></Book>
          <h1 className="font-bold text-2xl">Seus Dados</h1>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">
            Telefone: <span className="font-normal">{usuario?.phone}</span>
          </p>
          <p className="font-bold">
            Endereco:<span className="font-normal"> {usuario?.adress}</span>
          </p>
        </div>
        <Button className="bg-white mt-10 hover:bg-blue-600 text-black hover:text-white text-[15px]">
          Editar dados
        </Button>
      </div>
      <div className="space-y-2 mt-5 p-6 max-w-xl mx-auto flex flex-col bg-gradient-to-t from-blue-300 to-blue-100 rounded-lg mb-5">
        <SearchConsultas />
      </div>
    </>
  );
}
