import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YAQBOT API Documentation',
      version: '1.0.0',
      description: 'API documentation for YAQBOT, API built with TypeScript and Swagger',
    },
    servers: [{ url: 'http://localhost:3000/' }],
  },
  // apis: ['./routes/*.ts'],
  apis: [
    path.join(__dirname, '../routes/*.ts'), // Ruta a los archivos de rutas
    path.join(__dirname, '../dto/*.ts'), // Ruta a los archivos de DTOs
    path.join(__dirname, '../docs/tags/*.ts'), // Ruta a los archivos de tags
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
