export const ProductSchema = {
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
      price: 10.5,
      stock: 10,
      category: 'PLANT',
      image: ['http://i.pinimg.com/736x/52/a5/54/52a5548dd2df613a983a4a455a55070e.jpg'],
    },
  },
};
