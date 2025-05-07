import { useEffect, useState } from "react";

interface Plano {
  id: string;
  name: string;
}

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function PlanoCheckboxList({ value, onChange }: Props) {
  const [planos, setPlanos] = useState<Plano[]>([]);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const res = await fetch("http://localhost:4000/planoslist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setPlanos(data);
      } catch (err) {
        console.error("Erro ao buscar planos", err);
      }
    };

    fetchPlanos();
  }, []);

  const togglePlano = (name: string) => {
    onChange(
      value.includes(name)
        ? value.filter((item) => item !== name)
        : [...value, name]
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Quais planos você aceita?
      </label>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border p-3 rounded-lg">
        {planos.map((plano) => (
          <label key={plano.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value.includes(plano.name)}
              onChange={() => togglePlano(plano.name)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm">{plano.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
