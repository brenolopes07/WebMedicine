"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface AgendarConsultaDialogProps {
  medicoId: string;
}

export const AgendarConsultaDialog = ({
  medicoId,
}: AgendarConsultaDialogProps) => {
  const [dataConsulta, setDataConsulta] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const token = localStorage.getItem("token")

  const handleAgendar = async () => {
    if (!dataConsulta) return;

    setLoading(true);
    try {
      const isoData = format(new Date(dataConsulta), "yyyy-MM-dd'T'HH:mm:ssXXX");

      const response = await fetch("http://localhost:4000/consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          medicoId,
          dataConsulta: isoData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro do servidor:", errorText);
        throw new Error("Erro ao agendar");
      }

      setSucesso(true);
    } catch (error) {
      console.error("Erro ao agendar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute bottom-4 right-4 w-40 bg-blue-500 text-white hover:bg-blue-600 shadow">
          Ver Disponibilidade
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
        </DialogHeader>

        {!sucesso ? (
          <div className="flex flex-col gap-4 mt-2">
            <Input
              className="w-55"
              type="datetime-local"
              value={dataConsulta}
              onChange={(e) => setDataConsulta(e.target.value)}
            />
            <Button onClick={handleAgendar} disabled={loading} className="mt-5">
              {loading ? "Agendando..." : "Confirmar Agendamento"}
            </Button>
          </div>
        ) : (
          <p className="text-green-600 font-medium mt-4">
            Consulta agendada com sucesso!
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
