"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EditarDisponibilidadeModal() {
  const [open, setOpen] = useState(false);
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [diasAtendimento, setDiasAtendimento] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const handleSubmit = async () => {
    if (!horarioInicio || !horarioFim || diasAtendimento.length === 0) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/medico/disp",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            horarioInicio,
            horarioFim,
            diasAtendimento,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar disponibilidade.");
      }

      const data = await response.json();
      console.log("Disponibilidade atualizada:", data);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar disponibilidade.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (dia: string) => {
    setDiasAtendimento((prevState) =>
      prevState.includes(dia)
        ? prevState.filter((item) => item !== dia)
        : [...prevState, dia]
    );
  };

  return (
    <>
      <Button
        className="flex mt-5 bg-cyan-300 hover:bg-blue-500 text-black hover:text-white text-[15px] w-60"
        onClick={() => setOpen(true)}
      >
        Editar Disponibilidade
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              Editar Disponibilidade <br />
              <span className="text-gray-500 flex text-[15px] font-semibold">
                Caso queira manter os dados, escreva novamente!
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {error && <p className="text-red-600">{error}</p>}
            <p className="font-semibold text-[14px]">Horario de Inicio</p>
            <Input
              placeholder="Horário de Início"
              type="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
            />
            <p className="font-semibold text-[14px]">
              Horario de final de expediente
            </p>
            <Input
              placeholder="Horário de Término"
              type="time"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
            />

            <div>
              <h3 className="font-bold flex mb-3">Dias de Atendimento</h3>
              <div className="grid grid-cols-2 gap-2">
                {diasDaSemana.map((dia) => (
                  <div key={dia} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={diasAtendimento.includes(dia)}
                      onChange={() => handleCheckboxChange(dia)}
                    />
                    <span className="ml-2">{dia}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
