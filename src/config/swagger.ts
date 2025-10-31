import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { maxLength } from 'zod';
import { UserSchema } from './schemas/user.schema';
import { ProfileSchema } from './schemas/profile.schema';
import { ProductSchema } from './schemas/product.schema';
import { PlantSchema } from './schemas/plant.schema';

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
        ...UserSchema,
        ...ProfileSchema,
        ...ProductSchema,
        ...PlantSchema,
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.{ts,js}'),
    path.join(__dirname, '../docs/tags/*.{ts,js}'),
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
