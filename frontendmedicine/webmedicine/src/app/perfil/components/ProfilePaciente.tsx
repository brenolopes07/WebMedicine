"use client";

import { Book, Pen, Pencil, User } from "lucide-react";
import SearchConsultas from "./SearchConsultasPaciente";
import { EditarPacienteModal } from "./ModalEditPaciente";

type UsuarioPaciente = {
  name?: string;
  especialidade?: string;
  phone: string;
  crm?: string;
  horarioInicio?: string;
  horarioFim?: string;
  diasAtendimento?: string[];
  createdAt?: string;
  price?: string;
  adress?: string;
  Plano?: {name: string};
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
          <p className="font-bold">
            Plano:<span className="font-normal"> {usuario?.Plano?.name}</span>
          </p>
        </div>
        <EditarPacienteModal></EditarPacienteModal>
      </div>
      <div className="space-y-2 mt-5 p-6 max-w-xl mx-auto flex flex-col bg-gradient-to-t from-blue-300 to-blue-100 rounded-lg mb-5">
        <SearchConsultas />
      </div>
    </>
  );
}
