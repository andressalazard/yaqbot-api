export const PlantDetails = {
  type: 'object',
  description: 'Basic details of a plant',
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
      description: 'The mode of watering this plant',
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
};
