const formIoController = async (req, ...reply) => {
  const {
    body: { formId, action },
  } = req;

  const data = require(`./${formId}.controller.js`);

  if(data && data[action]){
    return data[action](req);
  }

  
  return { message: `${formId} action not supported`}
};

module.exports = { formIoController };
