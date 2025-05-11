"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CriarPlanoModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false); // novo estado

  const handleSubmit = async () => {
    if (!name.trim()) {
      setMensagem("O nome do plano não pode ser vazio.");
      setSucesso(false);
      return;
    }

    try {
      setLoading(true);
      setMensagem("");

      const response = await fetch("http://localhost:4000/planos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Plano já cadastrado ou inválido."
        );
      }

      setMensagem("Plano criado com sucesso!");
      setSucesso(true);
      setName("");
    } catch (error: any) {
      setMensagem(error.message);
      setSucesso(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setMensagem("");
          setSucesso(false);
          setName("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Criar Plano de Saúde
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Plano</DialogTitle>
          <DialogDescription>Informe o nome do plano.</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Nome do plano"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {mensagem && (
          <p
            className={`text-sm mt-2 ${
              sucesso ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensagem}
          </p>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Criando..." : "Criar"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
