"use client";

import { useEffect, useState } from "react";

interface Plano {
  id: string;
  name: string;
}

interface PlanoSelectProps {
  value: string;
  onChange: (id: string) => void;
}

export default function PlanoSelect({ value, onChange }: PlanoSelectProps) {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanos = async () => {
      setLoading(true); 
      setError(null); 

      try {
        const res: Response = await fetch("http://localhost:4000/planoslist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Falha ao buscar planos");
        }

        const data: Plano[] = await res.json();
        setPlanos(data);
      } catch (err) {
        setError(
          "Erro ao buscar planos: " + (err instanceof Error ? err.message : "")
        );
      } finally {
        setLoading(false); 
      }
    };

    fetchPlanos();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Plano de Saúde
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-2xl p-2"
        disabled={loading} // Desativa o select enquanto está carregando
      >
        <option value="">Selecione um plano</option>
        {loading ? (
          <option>Carregando planos...</option>
        ) : error ? (
          <option>{error}</option> // Exibe erro se houver
        ) : planos.length > 0 ? (
          planos.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.name}
            </option>
          ))
        ) : (
          <option>Nenhum plano disponível</option>
        )}
      </select>
    </div>
  );
}
