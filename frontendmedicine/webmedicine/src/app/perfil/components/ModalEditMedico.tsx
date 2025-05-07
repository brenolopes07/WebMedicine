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
import { PlanoCheckboxList } from "./PlanoCheckboxList";

export function EditarMedicoModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [price, setPrice] = useState("");
  const [adress, setAdress] = useState("");
  const [planosSelecionados, setPlanosSelecionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !name ||
      !phone ||
      !especialidade ||
      !price ||
      planosSelecionados.length === 0
    ) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/medicoupdt", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          phone,
          especialidade,
          price,
          Planos: planosSelecionados.map((name) => ({ name })),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar médico.");
      }

      const data = await response.json();
      console.log("Médico atualizado:", data);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar médico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="flex mt-5 bg-white hover:bg-blue-500 text-black hover:text-white text-[15px] w-60"
        onClick={() => setOpen(true)}
      >
        Editar dados
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              Editar dados do médico <br />{" "}
              <span className=" text-gray-500 flex text-[15px] font-semibold">
                Caso queira manter dados. Escreva novamente!{" "}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {error && <p className="text-red-600">{error}</p>}
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
            <Input
              placeholder="Especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
            <Input
              placeholder="Preço da consulta | Ex: 50,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <PlanoCheckboxList
              value={planosSelecionados}
              onChange={setPlanosSelecionados}
            ></PlanoCheckboxList>
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
