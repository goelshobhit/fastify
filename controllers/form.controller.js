const Form = require("../models/form.model");

exports.createForm = async (body, reply) => {
  try {
    const car = new Form(body);
    return car.save();
  } catch (err) {
    throw err;
  }
};
