import { info } from 'console';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'YAQBOT API Documentation',
      version: '1.0.0',
      description: 'API documentation for YAQBOT, API built with TypeScript and Swagger',
    },
    servers: [{ url: 'http://localhost:3000/' }],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
