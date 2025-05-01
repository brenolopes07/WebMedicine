"use client";

import { useAuth } from "@/hooks/useAuth";
import HeaderSemLogin, { HeaderComLogin } from "@/components/Header";
import { useEffect, useState } from "react";
import { ProfilePaciente } from "./components/ProfilePaciente";
import { ProfileMedico } from "./components/ProfileMedico";
import { useRouter } from "next/navigation";
import NotLoginPage from "@/components/NotLogin";
import { Loader } from "lucide-react";

type Usuario = {
  name: string;
  especialidade?: string;
  phone: string;
  crm?: string;
  Planos?: string[];
  horarioInicio?: string;
  horarioFim?: string;
  diasAtendimento?: string[];
  createdAt?: string;
  price?: string;
  adress?: string;
  Plano?: string;
};

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const { isAuthenticated, isRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        let endpoint = "";

        if (isRole === "paciente") {
          endpoint = "http://localhost:4000/paciente/profile";
        } else if (isRole === "medico") {
          endpoint = "http://localhost:4000/medicos/profile";
        } else {
          throw new Error("Tipo de usuário não identificado");
        }

        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Não foi possível carregar o perfil");
        }

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar perfil!");
      } finally {
        setLoading(false);
      }
      };

      if (isAuthenticated && isRole) {
      buscarUsuario();
        } else {
        setLoading(false);
        }
    }, [isAuthenticated, isRole]);

  if (loading) return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100">
      <Loader className="size-5"></Loader>
      <h1 className="font-bold text-1xl">Carregando seu perfil...</h1>
    </div>
  );
  if (erro) return <div>{erro}</div>;
  if (!isAuthenticated)
    return (
      <NotLoginPage></NotLoginPage>
    );

  return (
    <>
      <div>{isAuthenticated ? <HeaderComLogin /> : <HeaderSemLogin />}</div>
      <div>
        {isRole == "paciente" ? (
          <ProfilePaciente usuario={{ ...usuario!, Plano: usuario?.Plano ? { name: usuario.Plano } : undefined }} />
        ) : isRole === "medico" ? (
          <ProfileMedico usuario= {usuario!}></ProfileMedico>
        ) : (
          <NotLoginPage></NotLoginPage>
        )}
      </div>
    </>
  );
}
