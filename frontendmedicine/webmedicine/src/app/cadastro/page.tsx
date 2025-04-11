"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import FormPaciente from "./components/FormPaciente";
import FormMedico from "./components/FormMedico";

export default function SelectRole() {
  const router = useRouter();
  const [showPaciente, setShowPaciente] = useState(false);
  const [showMedico, setShowMedico] = useState(false);

  if (showPaciente) {
    return (
      <div className="flex flex-col min-h-screen min-w-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100">
        <div className="mb-5">
          <Logo></Logo>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-md w-96">
          <h2 className="text-center font-bold text-lg mb-5">Cadastre-se</h2>
          <FormPaciente
            role="PACIENTE"
            onClose={() => setShowPaciente(false)}
          />
        </div>
      </div>
    );
  }
  if (showMedico) {
    return (
      <div className="flex flex-col min-h-screen min-w-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100">
        <div className="mb-5">
          <Logo></Logo>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-md w-96">
          <h2 className="text-center font-bold text-lg mb-5">Cadastre-se</h2>
          <FormMedico role="MEDICO" onClose={() => setShowMedico(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100">
      <div className="mb-5">
        <Logo></Logo>
      </div>
      <div className="bg-blue-100 rounded-3xl w-75 h-65 flex flex-col justify-center items-center gap-8 ">
        <h2 className="text-2xl font-bold text-center ">Cadastre-se como:</h2>

        <div className="flex justify-between w-60 space-y-4">
          <Button
            onClick={() => setShowPaciente(true)}
            className="py-6 text-lg bg-blue-400"
          >
            Paciente
          </Button>

          <Button
            onClick={() => setShowMedico(true)}
            variant="outline"
            className="py-6 text-lg"
          >
            Médico
          </Button>
        </div>
        <h3 className="flex mb-1 gap-2">Ja tem cadastro? <span className="text-blue-900 cursor-pointer" onClick={()=>router.push('/login')}>Login</span></h3>
      </div>
    </div>
  );
}