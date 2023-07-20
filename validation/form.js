const validatePostForm = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    age: { type: "string", minLength: 2 },
    gender: { type: "string", maxLength: 10 },
    email: { type: "string" },
  },
  required: ["name", "age", "gender", "email"],
};

const formIoReqValidator = {
  type: "object",
  properties: {
    formId: { type: "string", minLength: 2 },
    action: {
      type: "string",
      enum: ["schema", "create","read","update","delete","list"],
    },
    initData: { type: "object", minLength: 1 },
  },
  required: ["formId", "action"],
};

const responseValidator = {
  type: "object",
  properties: {
    data: "object",
    message: "string",
  },
};


module.exports = {
  validatePostForm,
  formIoReqValidator,
  responseValidator,
};
