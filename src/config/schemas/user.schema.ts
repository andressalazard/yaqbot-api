export const UserSchema = {
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
        description:
          'a valid password(at least one lowercase letter, one uppercase letter, one number, one special character)',
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
      email: 'thehuman.torch@gmail.com',
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
};
