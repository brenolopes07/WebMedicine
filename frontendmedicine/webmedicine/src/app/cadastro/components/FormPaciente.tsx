"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function FormPaciente({
  role,
  onClose,
}: {
  role: string;
  
  onClose: () => void;
  
}) {
  const router = useRouter();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    adress: "",
    role: role,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar");

      router.push("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Nome Completo"
        value={formData.name}
        onChange={(e) => setformData({ ...formData, name: e.target.value })}
        className="mb-4 bg-white"
        required
      ></Input>
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setformData({ ...formData, email: e.target.value })}
        className="mb-4 bg-white"
        required
      ></Input>
      <Input
        type="password"
        placeholder="Senha"
        value={formData.password}
        onChange={(e) => setformData({ ...formData, password: e.target.value })}
        className="mb-4 bg-white"
        required
      ></Input>
      <Input
        type="text"
        placeholder="Endereco (ex: Rua Exemplo, 45)"
        value={formData.adress}
        onChange={(e) => setformData({ ...formData, adress: e.target.value })}
        className="mb-4 bg-white"
        required
      ></Input>
      <Input
        type="text"
        placeholder="Telefone"
        value={formData.phone}
        onChange={(e) => setformData({ ...formData, phone: e.target.value })}
        className="mb-4 bg-white"
        required
      ></Input>
      <div className="flex gap-5 justify-center ">
        <Button type="submit" className="w-61 bg-blue-400">
          Enviar
        </Button>
        <Button type="button" variant={"outline"} onClick={onClose}>
          Voltar
        </Button>
      </div>
    </form>
  );
}
