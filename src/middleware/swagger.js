import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express from "express";

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
    },
  },
  apis: ["../routes/*.js"],

};

const swaggerSpec = swaggerJsDoc(options);

router.use("/docs", serve, setup(swaggerSpec));

console.log("✅ Swagger middleware carregado!");
console.log(`http://localhost:3000/docs/`);



export default router;
