"use client";

// Primeiro defina a interface/types
type UsuarioPaciente = {
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
interface ProfilePacienteProps {
    usuario : UsuarioPaciente | null;
}

export function ProfilePaciente({ usuario }: ProfilePacienteProps) {


  return (
    <div className="space-y-4 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Olá, {usuario?.name}</h1>
      <div className="space-y-2">
        <p>
          <strong>Telefone:</strong> {usuario?.phone}
        </p>             
      </div>
    </div>
  );
}
