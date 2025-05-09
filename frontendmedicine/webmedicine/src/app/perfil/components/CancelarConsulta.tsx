"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface CancelarConsultaProps {
  consultaId: string;
  status: string; 
  onCancelado?: () => void; 
}

export default function CancelarConsulta({
  consultaId,
  status,
  onCancelado,
}: CancelarConsultaProps) {
  const [confirmando, setConfirmando] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancelar = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/cancelarconsulta", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: consultaId,
          status: "CANCELADA",
        }),
      });

      if (!res.ok) throw new Error("Erro ao cancelar consulta.");

      window.location.reload(); 
      if (onCancelado) onCancelado();             
    } finally {
      setLoading(false);
      setConfirmando(false);
    }
  };

  return (
    <div className="mt-2">
      {status === "CANCELADA" ? (
        <Button disabled className="bg-gray-400 text-white w-[170px]">
          Consulta Cancelada
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white w-[170px]"
              onClick={() => setConfirmando(true)}
            >
              Cancelar Consulta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Cancelamento</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja cancelar esta consulta?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={handleCancelar}
                disabled={loading}
              >
                {loading ? "Cancelando..." : "Sim, Cancelar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
