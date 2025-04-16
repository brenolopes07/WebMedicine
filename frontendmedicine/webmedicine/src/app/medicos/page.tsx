'use client'

import Header, { HeaderComLogin } from "@/components/Header";
import { useSearchParams } from "next/navigation"
import { useEffect, useState }  from 'react'
import { useAuth } from "@/hooks/useAuth";
import HeaderSemLogin from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ListaMedicos (){
    const {isAuthenticated} = useAuth();
    const searchParams = useSearchParams();
    const busca = searchParams.get('q') || ''

    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    useEffect (()=>{
        const buscarMedicos = async () => {
            try{
                setLoading(true);
                const res = await fetch (`http://localhost:5000/medicos?q=${encodeURIComponent(busca)}`);
                if(!res.ok) throw new Error ('Erro ao buscar medicos');
                const data = await res.json();
                setMedicos(data);
            }catch (err){
                setErro('Erro ao carregar medicos!')
            } finally{
                setLoading(false)
            }
        };
        
        if(busca) buscarMedicos();
    }, [busca]);

    return (
      <>
        <div className="p-4">
          {isAuthenticated ? (
            <HeaderComLogin></HeaderComLogin>
          ) : (
            <HeaderSemLogin></HeaderSemLogin>
          )}
          <h1 className="text-2xl font-bold ml-5 md:ml-10 text-black pb-5">
            Encontre Medicos
          </h1>
          <div className="flex justify-between gap-7 ml-5 md:ml-10 md:w-3xl mb-10 mr-3">
            <Input placeholder="Busque por médicos ou especialidades..."></Input>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">Buscar Médicos</Button>
          </div>

          {loading && <p>Carregando médicos...</p>}
          {erro && <p className="text-red-500">{erro}</p>}

          {medicos.length > 0 ? (
            <ul className="flex flex-col gap-4 ml-5 md:ml-9 mr-3 w-auto md:w-300 ">
              {medicos.map((medico: any) => (
                <li key={medico.id} className="border p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">
                    Dr(a). {medico.name}
                  </h2>
                  <p className="text-gray-600">{medico.especialidade}</p>
                  <Button className="flex ml-57 md:ml-auto bg-black">Ver Disponibilidade </Button>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>Nenhum médico encontrado.</p>
          )}
        </div>
      </>
    );
}