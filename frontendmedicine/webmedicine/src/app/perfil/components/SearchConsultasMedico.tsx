import { useState, useEffect  } from "react"
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button";
import CancelarConsulta from "./CancelarConsulta";


export default function SearchConsultas() {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
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
      <>
        <ul>
          <h1 className="font-bold text-[20px] flex justify-center mb-4  ">
            Suas Consultas
          </h1>
          {consultas.map((consulta: any) => (
            <li
              key={consulta.id}
              className="flex flex-col gap-2 p-4 border-b border-gray-200"
            >
              <h2 className="text-lg font-bold">{consulta.medico.name}</h2>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`text-sm text-gray-600 ${
                    consulta.status === "CANCELADA"
                      ? "text-red-500 font-bold"
                      : "text-green-500 font-bold"
                  }`}
                >
                  {consulta.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Data: {formatarData(consulta.dataConsulta)}
              </p>
              <p className="text-sm text-gray-600">
                Nome do Paciente:{" "}
                <span className="font-bold">{consulta.paciente.name}</span>
              </p>
              <p className="text-sm text-gray-600">
                Preço: {consulta.medico.price}
              </p>
              <div className="flex justify-between">
                <CancelarConsulta consultaId={consulta.id} status={consulta.status}></CancelarConsulta>
                <Button
                  className="flex mt-4 bg-cyan-500"
                  onClick={() =>
                    window.open(
                      `http://localhost:4000/consultas/${consulta.id}/pdf`,
                      "_blank"
                    )
                  }
                >
                  Gerar comprovante
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
}