import puppeteer from "puppeteer";
import { prisma } from "../prisma/prisma";

export const consultaPdfService = async (id: string) => {
    const consulta = await prisma.consulta.findUnique({
        where: { id },
        include: {
            paciente:true,
            medico:true,
            },
        });

        if(!consulta){
            throw new Error('Consulta nao encontrada');
        }

        const htmlContent = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
            .container { border: 1px solid #ddd; padding: 20px; border-radius: 10px; width: 80%; margin: auto; }
            h1 {
                text-align: center;
            }
            .info {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Detalhes da Consulta</h1>
            <p class="info"><strong>Paciente:</strong> ${consulta.paciente.name}</p>
            <p class="info"><strong>Medico:</strong> ${consulta.medico.name}</p>
            <p class="info"><strong>Data da Consulta:</strong> ${consulta.dataConsulta.toString()}</p>
            <p class="info"><strong>Status:</strong> ${consulta.status}</p>
            <p class="info"><strong>Especialidade do Medico:</strong> ${consulta.medico.especialidade}</p>
        </div>
    </body>
</html>
`;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        const pdfBuffer = await page.pdf({
            format: "A4", printBackground: true,});

        await browser.close();
            return pdfBuffer;
        };
