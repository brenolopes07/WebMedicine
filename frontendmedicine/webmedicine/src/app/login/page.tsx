"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/Logo";


export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) =>{
        e.preventDefault();
        setError("");
        
        try{
            const res = await fetch("http://localhost:4000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            if(!res.ok) throw new Error ("Credenciais Invalidas!");

            const data = await res.json();

            if(!data.token){
                throw new Error ("Token ou tipo de usuario nao encontrado na resposta");
                console.log(error)
            }
            
            const tokenString = data.token.token;
            localStorage.setItem("token", tokenString);

            const roleString = data.token.role;
            localStorage.setItem("role", roleString);

            router.push("/homepage")
        } catch (err:any){
            setError(err.message);
        }
    };
  

    return (
      <div className="flex flex-col min-h-screen min-w-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100">
        <div className="mb-10">
          <Logo></Logo>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-blue-100 p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl text-center font-bold mb-8">Login</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 bg-white"
            required
            
            
          ></Input>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 bg-white"
            required
          ></Input>
          <h3 className="text-sm mt-3 p-2">
            Não possui uma conta{" "}
            <span className="text-blue-900 cursor-pointer" onClick={()=> router.push('/cadastro')}>Cadastre-se!</span>
          </h3>
          <Button type="submit" className="w-full mt-5 bg-blue-400">
            Entrar
          </Button>
        </form>
      </div>
    );
}


