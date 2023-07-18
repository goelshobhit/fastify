const User = require("../models/user.model")

exports.createUser = async (body, reply) => {
  try {
    const car = new User(body);
    return car.save();
  } catch (err) {
    throw err;
  }
};
