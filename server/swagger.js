// swagger.js - ROOT folder mein banao

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mera Personal Project API",
      version: "1.0.0",
      description: "Ye meri practice API hai - Learning Swagger! ",
      contact: {
        name: "Ayush saxena",
        email: "saxenaayush381@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5006",
        description: "Development Server",
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
  },
  // Swagger ko batao ki routes kahan dekhe
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
