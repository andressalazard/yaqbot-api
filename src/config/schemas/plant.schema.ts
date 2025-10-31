import { format } from 'path';

export const PlantSchema = {
  NewPlantDetails: {
    type: 'object',
    description: 'details of the plant',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the plant',
        example: 'Black FlowerPot',
      },
      type: {
        type: 'string',
        description: 'The type of the plant',
        example: 'Indoors plant',
      },
      maxHeight: {
        type: 'number',
        description: 'The height of the plant in meters',
        example: 1.2,
      },
      wateringMode: {
        type: 'string',
        description: `The mode of watering this plant`,
        enum: ['HIGH', 'MODERATE', 'LOW'],
        example: 'LOW',
      },
      wateringFrequency: {
        type: 'number',
        description: 'The number of times you need to water this plant on the day',
        example: 1,
      },
      weather: {
        type: 'array',
        description: 'The different type of weather the plant can be adapted to',
        items: {
          type: 'string',
          enum: [
            'CLEAR',
            'CLOUDY',
            'PARTIALLY_CLOUDLY',
            'OVERCAST',
            'GLOOMY',
            'BRIGHT',
            'DARK',
            'FOGGY',
            'MISTY',
            'HAZY',
            'DAMP',
          ],
        },
        example: ['CLEAR', 'CLOUDY'],
      },
      light: {
        type: 'string',
        description: 'The type of light source mode the plants needs to grow',
        enum: ['FULL_SUNLIGHT', 'PARTIAL_LIGHT', 'INDIRECT_SUNLIGHT', 'DAPPLED_LIGHT', 'SHADE'],
        example: 'PARTIAL_LIGHT',
      },
      specialCares: {
        type: 'string',
        description: 'Additional instructions to take care of this plant',
        example: 'When you water this plant be sure it wont touch the leaves of the plant.',
      },
    },
    example: {
      name: 'Black FlowerPot',
      type: 'Indoors plant',
      maxHeight: 1.2,
      wateringMode: 'LOW',
      wateringFrequency: 1,
      weather: ['CLEAR', 'CLOUDY'],
      light: 'PARTIAL_LIGHT',
      specialCares: 'When you water this plant be sure it wont touch the leaves of the plant.',
    },
  },

  CatalogPlant: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for a plant',
        example: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      },
      name: {
        type: 'string',
        description: `The plant's name`,
        required: true,
        example: 'Green Cucumber',
      },
      image: {
        type: 'array',
        description: 'The image of the new plant',
        required: true,
        example: ['http://i.pinimg.com/736x/52/a5/54/52a5548dd2df613a983a4a455a55070e.jpg'],
      },
      plant: {
        type: 'object',
        description: 'details of the plant',
        properties: {
          type: {
            type: 'string',
            description: 'The type of the plant',
            example: 'Indoors plant',
          },
          weather: {
            type: 'array',
            description: 'The different type of weather the plant can be adapted to',
            items: {
              type: 'string',
              enum: [
                'CLEAR',
                'CLOUDY',
                'PARTIALLY_CLOUDLY',
                'OVERCAST',
                'GLOOMY',
                'BRIGHT',
                'DARK',
                'FOGGY',
                'MISTY',
                'HAZY',
                'DAMP',
              ],
            },
            example: ['CLEAR', 'CLOUDY'],
          },
        },
      },
    },
    example: {
      id: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      name: 'Cucumber',
      image: ['http://i.pinimg.com/736x/52/a5/54/52a5548dd2df613a983a4a455a55070e.jpg'],
      plant: {
        type: 'indoor plant',
        weather: ['CLEAR', 'CLOUDY'],
      },
    },
  },
  AvailablePlant: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for a plant',
        example: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      },
      productName: {
        type: 'string',
        description: `The product's name`,
        example: 'Black FlowerPot',
      },
      plant: {
        type: 'object',
        description: 'details of the plant',
        properties: {
          type: {
            type: 'string',
            description: 'The type of the plant',
            example: 'Indoors plant',
          },
          maxHeight: {
            type: 'number',
            description: 'The height of the plant in meters',
            example: 1.2,
          },
          wateringMode: {
            type: 'string',
            description: `The mode of watering this plant`,
            enum: ['HIGH', 'MODERATE', 'LOW'],
            example: 'LOW',
          },
          wateringFrequency: {
            type: 'number',
            description: 'The number of times you need to water this plant on the day',
            example: 1,
          },
          weather: {
            type: 'array',
            description: 'The different type of weather the plant can be adapted to',
            items: {
              type: 'string',
              enum: [
                'CLEAR',
                'CLOUDY',
                'PARTIALLY_CLOUDLY',
                'OVERCAST',
                'GLOOMY',
                'BRIGHT',
                'DARK',
                'FOGGY',
                'MISTY',
                'HAZY',
                'DAMP',
              ],
            },
            example: ['CLEAR', 'CLOUDY'],
          },
          specialCares: {
            type: 'string',
            description: 'Additional instructions to take care of this plant',
            example: 'When you water this plant be sure it wont touch the leaves of the plant.',
          },
        },
      },
    },
    example: {
      id: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      productName: 'Black FlowerPot',
      plant: {
        type: 'Indoors plant',
        maxHeight: 1.2,
        wateringMode: 'LOW',
        wateringFrequency: 1,
        weather: ['CLEAR', 'CLOUDY'],
        specialCares: 'When you water this plant be sure it wont touch the leaves of the plant.',
      },
    },
  },

  NewUserPlantRegister: {
    type: 'object',
    properties: {
      userid: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for a user',
        example: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      },
      plant: {
        type: 'object',
        description: 'details of the new chosen plant',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique identifier for a plant',
            example: '693772fe-b6e2-418b-a816-77a6f7521060',
          },
          nickname: {
            type: 'string',
            description: 'The name of the plant chosen by the user',
            example: 'Happy Sunshine',
          },
        },
      },
    },
    example: {
      userid: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      plant: {
        id: '693772fe-b6e2-418b-a816-77a6f7521060',
        nickname: 'Happy Sunshine',
      },
    },
  },

  OwnedPlant: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for owned Plant',
        example: '693772fe-b6e2-418b-a816-77a6f7521060',
      },
      nickname: {
        type: 'string',
        description: 'The name of the plant given by its owner',
        example: 'Snowball II',
      },
      status: {
        type: 'string',
        description: 'The status of the owners plant',
        example: 'ALIVE',
      },
      plant: {
        type: 'object',
        description: 'details of the owners plant',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique identifier of the plant',
            example: 'e244fee9-4ac7-47ab-a639-135d8384eea9',
          },
          name: {
            type: 'string',
            description: 'The name of the plant',
            example: 'Peace Lily',
          },
          type: {
            type: 'string',
            description: 'The group the plant belongs to',
            example: 'Indoor plant',
          },
          weather: {
            type: 'array',
            description: 'The different type of weather the plant can be adapted to',
            items: {
              type: 'string',
              enum: [
                'CLEAR',
                'CLOUDY',
                'PARTIALLY_CLOUDLY',
                'OVERCAST',
                'GLOOMY',
                'BRIGHT',
                'DARK',
                'FOGGY',
                'MISTY',
                'HAZY',
                'DAMP',
              ],
            },
            example: ['CLEAR', 'CLOUDY'],
          },
        },
      },
    },
    example: {
      id: '4a3b4313-8d92-44a8-8145-54e3e51b4bed',
      nickname: 'Snowball II',
      status: 'ALIVE',
      plant: {
        id: '693772fe-b6e2-418b-a816-77a6f7521060',
        name: 'Peace Lily',
        type: 'Indoor Plant',
        weather: ['CLEAR', 'CLOUDY'],
      },
    },
  },
};
