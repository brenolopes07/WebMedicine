                                  'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import HeaderSemLogin, { HeaderComLogin } from "@/components/Header";

export default function HomePage() {
  const [busca, setBusca] = useState('');
  const router = useRouter();
  const { isAuthenticated} = useAuth();

  const handleBuscar = () =>{
    if (!busca.trim()) return;
    router.push(`/medicos?q=${encodeURIComponent(busca)}`)
  }
  return (
    <>
      <div>{isAuthenticated ? <HeaderComLogin /> : <HeaderSemLogin />}</div>
      <div className="flex flex-col items-center text-center px-4 border-b">
        <h1 className="text-blue-500 font-bold text-3xl md:text-4xl mt-10">
          Suas consultas médicas simplificadas
        </h1>
        <h2 className="text-gray-500 mt-3 text-base md:text-lg max-w-xl">
          Encontre os melhores médicos, agende consultas e cuide da sua saúde
          sem complicações.
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-3 mt-6 w-full max-w-xl">
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busque por médicos ou especialidades..."
            className="w-full"
          />
          <Button
            className="w-110 md:w-auto bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            onClick={handleBuscar}
          >
            Buscar Médicos
          </Button>
        </div>

        <div className="flex mt-5 gap-2 mb-12">
          <Button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer "
          >
            Entrar
          </Button>
          <Button
            onClick={() => router.push("/cadastro")}
            className="bg-white hover:bg-blue-500 text-black hover:text-white cursor-pointer"
          >
            Criar Conta
          </Button>
        </div>
      </div>
      <div className="flex mt-5 justify-center">
        <h1 className="font-bold text-2xl">Como funciona</h1>
      </div>

      <div className="flex flex-col md:flex-row mt-12 justify-center items-center gap-12 px-4 mb-12">
        <div className="flex items-center flex-col text-center gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
          <Search className="w-12 h-12 text-blue-500" />
          <h1 className="font-semibold text-lg">Encontre Especialistas</h1>
          <h2 className="text-gray-400">
            Busque medicos por nome, especialidade e encontre o profissional
            ideal para voce.
          </h2>
        </div>

        <div className="flex items-center flex-col text-center gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
          <Calendar className="w-12 h-12 text-blue-500" />
          <h1 className="font-semibold text-lg">Agende Consultas</h1>
          <h2 className="text-gray-400">
            Veja a disponibilidade em tempo real e marque sua consulta em poucos
            cliques, sem complicacoes
          </h2>
        </div>

        <div className="flex items-center flex-col text-center gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
          <User className="w-12 h-12 text-blue-500" />
          <h1 className="font-semibold text-lg">Gerencie seu Cuidado</h1>
          <h2 className="text-gray-400">
            Acompanhe seu historico de consultas e recebe lembretes sobre seus
            proximos agendamentos
          </h2>
        </div>      
      </div>
    </>
  );
}
