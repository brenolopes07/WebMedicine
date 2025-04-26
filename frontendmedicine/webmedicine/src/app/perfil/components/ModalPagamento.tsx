import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalPagamentoProps {
  valor: number;
}

export function ModalPagamento({ valor }: ModalPagamentoProps) {
  const [pagando, setPagando] = useState(false);
  const [pago, setPago] = useState(false);

  const handlePagamento = () => {
    setPagando(true);

    setTimeout(() => {
      setPagando(false);
      setPago(true);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-700 text-white mt-3 w-[170px]">
          Confirmar Pagamento
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-4 p-6">
        <DialogTitle>Pagamento</DialogTitle>
        <h2 className="text-xl font-bold">
          {" "}
          Valor: {valor ? valor : "Consulta Gratuita"}
        </h2>
        <Button
          onClick={handlePagamento}
          disabled={pagando || pago}
          className={`w-[190px]  ${
            pago
              ? "bg-green-700 cursor-default"
              : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {pagando
            ? "Processando..."
            : pago
            ? "Pagamento Confirmado ✅"
            : "Pagar Agora"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
