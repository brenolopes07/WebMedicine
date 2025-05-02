"use client";

import { Book, User } from "lucide-react";
import SearchConsultas from "./SearchConsultasPaciente";
import { Button } from "@/components/ui/button";
import SearchConsultasMedico from "./SearchConsultasMedico";

// Primeiro defina a interface/types
type UsuarioMedico = {
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

};
interface ProfileMedicoProps {
  usuario: UsuarioMedico | null;
}

export function ProfileMedico({ usuario }: ProfileMedicoProps) {
  return (
    <>
      <div className="space-y-4 p-6 max-w-xl mx-auto mt-10 flex gap-3 bg-gradient-to-l from-blue-400 to-blue-100  rounded-lg">
        <User className="size-8"></User>
        <h1 className="text-2xl font-bold">Olá, {usuario?.name}</h1>
        <div className="flex ml-40">
          <h2 className="font-bold text-white flex justify-center bg-gray-900 rounded-4xl h-8 w-30 items-center">{usuario?.especialidade}</h2>
        </div>
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
            Preço por consulta:
            <span className="font-normal ml-1">
              {usuario?.price ? usuario.price : "Preço não informado"}
            </span>
          </p>
          <p className="font-bold">
            Planos:
            <span className="font-normal ml-1">
              {usuario?.Planos && usuario.Planos.length > 0
                ? usuario.Planos.join(", ") 
                : "Nenhum plano associado"}
            </span>
          </p>
          <p className="font-bold">
            Horario de Atendimento:{" "}
            <span className="font-normal">
              {" "}
              {usuario?.horarioInicio} as {usuario?.horarioFim}{" "}
            </span>
          </p>
          <p className="font-bold">
            Dias de Atendimento:{" "}
            <span className="font-normal">
              {usuario?.diasAtendimento
                ?.map((dia) => {
                  const trimmed = dia.trim().toLowerCase();
                  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                })
                .join(", ")}
            </span>
          </p>
        </div>
        <div className="flex gap-10 justify-center  ">
          <Button className="bg-white mt-5 hover:bg-blue-600 text-black hover:text-white text-[15px] w-60">
            Editar dados
          </Button>
          <Button className="bg-cyan-300 mt-5 hover:bg-blue-600 text-black hover:text-white text-[15px] w-60">
            Editar Plano
          </Button>
        </div>
      </div>
      <div className="space-y-2 mt-5 p-6 max-w-xl mx-auto flex flex-col bg-gradient-to-t from-blue-300 to-blue-100 rounded-lg mb-5">
        <SearchConsultasMedico></SearchConsultasMedico>
      </div>
    </>
  );
}
