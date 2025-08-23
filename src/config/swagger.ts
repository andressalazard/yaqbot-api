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
    components: {
      schemas: {
        UpdateUser: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            username: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../docs/tags/*.ts')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
