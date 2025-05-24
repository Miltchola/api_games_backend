import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express from "express";

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GAMES API",
      version: "1.0.0",
      description: "Documentação da API com Swagger",
    }, servers: [
      {
        url: "https://api-games-backend.onrender.com",  
        description: "Servidor de Produção (Render)",
      }, 
      {
        url: "https://api-games-backend.vercel.app",  
        description: "Servidor de Produção (Vercel)",
      },
      {
        url: "http://localhost:3000",  // URL local
        description: "Servidor Local (Desenvolvimento)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Garante que todos os arquivos da pasta routes sejam lidos
};

const swaggerSpec = swaggerJsDoc(options);

router.use("/docs", serve, setup(swaggerSpec));

console.log("✅ Swagger middleware carregado!");
console.log(`📄 Documentação disponível em: http://localhost:3000/docs/`);

export default router;
