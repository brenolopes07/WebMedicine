"use client";

// Primeiro defina a interface/types
type UsuarioMedico = {
  name?: string;
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
interface ProfileMedicoProps {
  usuario: UsuarioMedico | null;
}

export function ProfileMedico({ usuario }: ProfileMedicoProps) {
  return (
    <div className="space-y-4 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Olá, {usuario?.name}</h1>
      <div className="space-y-2">        
      </div>
    </div>
  );
}
