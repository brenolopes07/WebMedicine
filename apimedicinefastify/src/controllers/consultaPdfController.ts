import { FastifyRequest, FastifyReply } from "fastify";
import { consultaPdfService } from "../services/consultaPdfService";

export const consultaPdfController = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { id } = req.params as { id: string };
        if (!id) {
            return res.status(400).send({ message: 'Consulta nao encontrada' });
        }
        const pdfBuffer = await consultaPdfService(id);
        res.header("Content-Type", "application/pdf")
        .header("Content-Disposition", `attachment; filename=comprovante-${id}.pdf`)
        .send(pdfBuffer);
    } catch (error) {
        res.status(400).send(console.log(error))
    }
}