const formIo = (req) => {
  const {
    body: { action, formId },
  } = request;

  const customModel = require(`./customforms/${formId}.js`);

  switch (action) {
    case "get":
      return get(req, customModel);
  }
};

const get = (req, customModel) => {
  if (customModel["get"]) {
    const data = customModel["get"](req, data);
    return { data, message: "" };
  }

  // get data from req.
  return { data: res, message: "" };
};

const upsert = (req, customModel) => {
  if (customModel["beforepUdate"]) {
    req = customModel["beforeUpdate"](req);
  }

  if (customModel["Udate"]) {
    const response = customModel["Update"](req);

    if (response) {
      return { message: "Updated successfully" };
    }

    // update record as per request.
  }
};

const list = (req) => {
  let data = {};

  const res = {};

  if (customModel["list"]) {
    data = customModel["list"](req, data);
    return { data };
  }
};

const del = (req) => {
  if (customModel["beforeDelete"]) {
    req = customModel["beforeDelete"](req);
  }

  if (customModel["delete"]) {
    const response = customModel["delete"](req);

    if (response) {
      return { message: "Deleted successfully" };
    }

    // delete record as per request.
  }
};

module.exports = { formIo };
