'use client'

import { useState, useEffect  } from "react"
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button";


export default function SearchConsultas() {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    const token = localStorage.getItem("token")

    useEffect(() => {
        const consulta = async () => {
            try {
                const res = await fetch("http://localhost:4000/consultalist", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Não foi possível carregar as consultas");
                }

                const data = await res.json();
                setConsultas(data);
            } catch (err) {
                setError("Erro!");
            } finally {
                setLoading(false);
            }
        };
        consulta();
    }, []);
    const formatarData = (dataIso: string) => {
        const data = new Date(dataIso);

        const dataFormatada = data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit", 
            year: "numeric",
        });

        const horaFormatada = data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
        });
        return `${dataFormatada} às ${horaFormatada}`;
    }

    return (
      <ul>
        <h1 className="flex justify-center font-bold text-[20px]">
          Suas Consultas
        </h1>
        {consultas.map((consultas: any) => (
          <li
            key={consultas.id}
            className="flex flex-col gap-2 p-4 border-b border-gray-200"
          >
            <h2 className="text-lg font-bold">{consultas.medico.name}</h2>
            <p className="text-sm text-gray-600">Status: {consultas.status}</p>
            <p className="text-sm text-gray-600">
              Data: {formatarData(consultas.dataConsulta)}
            </p>
            <p className="text-sm text-gray-600">{consultas.medico.price}</p>
            <Button className="bg-green-500 hover:bg-green-700  text-white mt-3 w-[170px]">
              Confirmar Pagamento
            </Button>
          </li>
        ))}
      </ul>
    );
}
