"use client";

import { useAuth } from "@/hooks/useAuth";
import HeaderSemLogin, { HeaderComLogin } from "@/components/Header";
import { useEffect, useState } from "react";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        let res = await fetch(`http://localhost:4000/paciente/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          res = await fetch(`http://localhost:4000/medicos/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (!res.ok) {
            throw new Error("Não foi possível carregar o perfil");
          }
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

    buscarUsuario(); // 👉 Aqui você chama a função
  }, []);

  return (
    <>
      <div>{isAuthenticated ? <HeaderComLogin /> : <HeaderSemLogin />}</div>

      <div className="p-6 max-w-xl mx-auto">            
      </div>
              
    </>
  );
}
