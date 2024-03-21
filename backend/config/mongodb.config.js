const mongoose = require("mongoose");

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL + "/turnover-ecommerce-app");
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = mongodbConnection;