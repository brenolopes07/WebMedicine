import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger,DropdownMenuSeparator } from "./ui/dropdown-menu";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { CriarPlanoModal } from "./CadastrarPlano";

export default function HeaderSemLogin(){
    const router = useRouter();
    

    return (
      <div className="flex  justify-between items-center m-4 border-b border-gray-300 pb-3">
        <div className="mb-2 md:mb-0">
          <Logo />
        </div>
        <div className="flex gap-2 mb-3">
          <Button
            onClick={() => router.push(`/login`)}
            className="bg-white hover:bg-blue-500 text-black hover:text-white cursor-pointer" 
          >
            Entrar
          </Button>
          <Button
            onClick={() => router.push(`/cadastro`)}
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
          >
            Cadastrar
          </Button>
        </div>
      </div>
    );
}

export function HeaderComLogin() {
    const router = useRouter();
    const { isRole } = useAuth();
    const { logout } = useAuth();
  return (
    <div className="flex justify-between items-center m-4 border-b pb-5">
      <div className="mb-2 md:mb-0 ml-0 md:ml-10">
        <Logo />
      </div>

      <div className="flex gap-2 mr-0 md:mr-10 ">
        {isRole === "medico" && (
          <CriarPlanoModal></CriarPlanoModal>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/perfil")}>
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); router.push("/login"); }}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}