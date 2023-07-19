const { formIo } = require("../validation/form");

const validate = (obj) => {
  if (obj) {
    // Check if the object has any properties.
    if (Object.keys(obj).length === 0) {
      return true;
    }

    // Check if any of the properties are null or empty strings.
    for (const property in obj) {
      if (obj[property] === null || obj[property] === "") {
        return true;
      }
    }
  }

  return false;
};

const handleAction = (action, formId, formIo, data) => {
  switch (action) {
    case "create":
      const isValidObject = validate(data);

      if (isValidObject) {
        return {
          data: {},
          message: "data is invalid",
        };
      }

      // const response = await fastify.mongo.db
      // .collection("form")
      // .insertOne(initData);

      return { data, message: "Data has been saved" };
    case "schema":
      return { data: formIo, message: "Schema of the data" };
    default:
      return { data: {}, message: "invalid request" };
  }
};

exports.createProfile = async (request, reply) => {
  const {
    body: { action, formId, data },
  } = request;


return { message: "Profile handler"};
};
