module.exports = {
    HOST: "localhost",
    USER: "almyra",
    PASSWORD: "mysecretpassword",
    DB: "expressauth",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };