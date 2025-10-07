import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { maxLength } from 'zod';

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
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the user',
              example: '693772fe-b6e2-418b-a816-77a6f7521060',
            },
            username: {
              type: 'string',
              description: `User's chosen username`,
              example: 'johnnydoe12',
            },
            email: {
              type: 'string',
              description: `User's own email address`,
              example: 'john.doe@email.com',
            },
            role: {
              type: 'string',
              description: 'The role the user takes on the app',
              enum: ['USER', 'ADMIN'],
              example: 'USER',
            },
          },
          example: {
            id: '67cdd1ea-5f1a-44a2-830a-9f70a1bb23b9',
            username: 'janedoe',
            email: 'jane.doe@example.com',
            role: 'USER',
          },
        },
        NewUser: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: `The chosen username`,
              example: 'johnnydoe',
            },
            email: {
              type: 'string',
              description: `a valid email`,
              example: 'john.doe123@gmail.com',
            },
            password: {
              type: 'string',
              description: 'a valid password(at least one lowercase letter, one uppercase letter, one number, one special character)',
              example: 'jOhn@12',
            },
          },
          example: {
            username: 'johnnyDoe12',
            email: 'john.doe.123@gmail.com',
            example: 'jOhn@12',
          },
        },
        LoggedUser: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'A username already stored in DB',
              example: 'johnnyStorm12',
            },
            email: {
              type: 'string',
              description: 'An email already stored in DB',
              example: 'the.human.torch@gmail.com',
            },
            role: {
              type: 'string',
              description: 'The role the user takes on the app',
              enum: ['USER', 'ADMIN'],
              example: 'USER',
            },
          },
          example: {
            username: 'johnnyStorm12',
            email: 'the.human.torch@gmail.com',
            role: 'USER',
          },
        },

        UpdatedUser: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: `The new user's chosen username`,
              example: 'johndoe',
            },
            email: {
              type: 'string',
              description: `The new user's email address`,
              example: 'johndoe123@email.com',
            },
          },
          example: {
            id: '67cdd1ea-5f1a-44a2-830a-9f70a1bb23b9',
            username: 'janedoe',
            email: 'jane.doe@example.com',
          },
        },

        Profile: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the profile',
              example: '693772fe-b6e2-418b-a816-77a6f7521060',
            },
            fullname: {
              type: 'string',
              description: 'Firstname and Lastname of the user',
              example: 'John Doe',
            },
            phone: {
              type: 'string',
              description: `User's phone number`,
              example: '+593 990077189',
            },
            region: {
              type: 'string',
              description: `User's City/State/Country`,
              example: 'New York, United States',
            },
            address: {
              type: 'string',
              description: `User's personal address`,
              example: 'Times Square–42nd Street station',
            },
            birthday: {
              type: 'string',
              description: `User's birthday`,
              example: '19-09-1984',
            },
            gender: {
              type: 'string',
              enum: ['MALE', 'FEMALE', 'OTHER'],
              example: 'MALE',
            },
            avatar: {
              type: 'string',
              description: 'URL for User picture',
            },
            bio: {
              type: 'string',
              description: `User's biography`,
              example: 'I live in New York since 2004',
            },
            gardernerlevel: {
              type: 'string',
              description: 'The level of gardener the User has',
              enum: ['AMATEUR', 'INTERMEDIATE', 'PRO'],
              example: 'AMATEUR',
            },
          },
          example: {
            fullname: 'Jane Doe',
            phone: '+51 2302993939',
            region: 'Quito, Ecuador',
            address: 'Main Avenue',
            birthday: '01-01-1900',
          },
        },

        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for a product',
              example: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
            },
            name: {
              type: 'string',
              description: `The product's name`,
              example: 'Black FlowerPot',
            },
            description: {
              type: 'string',
              description: 'The details about the product',
              example: 'A pot in which plants and other plants are cultivated and displayed.',
            },
            price: {
              type: 'float',
              description: 'The price amount of the product',
              example: '29.90',
            },
            stock: {
              type: 'int',
              description: 'The number of available units of the product',
              example: '10',
            },
            category: {
              type: 'string',
              description: `The category of the product based on it's purpose`,
              enum: ['PLANT', 'FERTILIZER', 'FLOWERPOT', 'TOOL', 'OTHER'],
              example: 'FLOWERPOT',
            },
          },
          example: {
            id: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
            name: 'Black FlowerPot',
            price: '29.90',
            stock: '10',
            category: 'FLOWERPOT',
          },
        },
        NewProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: `The product's name`,
              required: true,
              example: 'Green Cucumber',
            },
            description: {
              type: 'string',
              description: 'The details about the product',
              required: false,
              example: 'A green vegetable that is served on salads.',
            },
            price: {
              type: 'float',
              description: 'The price amount of the product',
              required: true,
              example: '10.50',
            },
            stock: {
              type: 'int',
              description: 'The number of available units of the product',
              required: true,
              example: '10',
            },
            category: {
              type: 'string',
              description: `The category of the product based on it's purpose`,
              enum: ['PLANT', 'FERTILIZER', 'FLOWERPOT', 'TOOL', 'OTHER'],
              example: 'PLANT',
            },
            image: {
              type: 'array',
              description: 'The image of the new product',
              required: true,
              example: ['http://i.pinimg.com/736x/52/a5/54/52a5548dd2df613a983a4a455a55070e.jpg'],
            },
          },
          example: {
            name: 'Cucumber',
            description: 'A green vegetable that is served on salads.',
            price: '10.50',
            stock: '10',
            category: 'FLOWER',
            image: ['http://i.pinimg.com/736x/52/a5/54/52a5548dd2df613a983a4a455a55070e.jpg'],
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../docs/tags/*.ts')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
