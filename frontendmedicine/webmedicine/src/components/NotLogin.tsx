'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function NotLoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-100">            
            <h1 className="text-2xl font-bold mb-4">Você não está logado</h1>
            <p className="mb-4">Faça login para acessar seu perfil.</p>
            <Button
              onClick={() => router.push("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Fazer Login
            </Button>
          </div>
  );
}
