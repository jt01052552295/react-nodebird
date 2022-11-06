const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "videoclass",
    password: process.env.DB_PASSWORD,
    database: "videoclass",
    host: "videoclass.cafe24.com",
    dialect: "mysql",
  },
  test: {
    username: "videoclass",
    password: process.env.DB_PASSWORD,
    database: "videoclass",
    host: "videoclass.cafe24.com",
    dialect: "mysql",
  },
  production: {
    username: "videoclass",
    password: process.env.DB_PASSWORD,
    database: "videoclass",
    host: "videoclass.cafe24.com",
    dialect: "mysql",
  },
};
