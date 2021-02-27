const mongoose = require('mongoose');
const keys = require('./keys');

const DB = keys.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
