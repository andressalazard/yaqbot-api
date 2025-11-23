export const ProfileSchema = {
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
};
