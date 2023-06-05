import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Notes API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.ts", "./prisma/models.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
