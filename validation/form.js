const validatePostForm = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2 },
      age: { type: 'string', minLength: 2 },
      gender: { type: 'string', maxLength: 10 },
      email: { type: 'string' }
    },
    required: ['name','age','gender','email']
};

module.exports = {
  validatePostForm,
};
