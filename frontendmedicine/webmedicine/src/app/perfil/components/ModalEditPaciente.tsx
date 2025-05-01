'use client";'

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

export function EditarPacienteModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  

  const handleSubmit = async () => {
    if (!name || !phone || !adress ) {
      setError("Por favor, preencha todos os campos.");
      return; 
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/pacienteupdt", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, phone, adress, }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar paciente.");
      }

      const data = await response.json();
      console.log("Paciente atualizado:", data);
      setOpen(false);
      window.location.reload(); 
    } catch (error) {
        setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Button
        className="bg-white mt-10 hover:bg-blue-600 text-black hover:text-white text-[15px]"
        onClick={() => setOpen(true)}
      >
        Editar dados
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar dados do paciente</DialogTitle>
          </DialogHeader>
           <div className="space-y-4">
            {error && <p className="text-red-600">{error}</p>} {/* Mensagem de erro */}

            <div className="space-y-4">
              <Input
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder="Endereço"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />        
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
