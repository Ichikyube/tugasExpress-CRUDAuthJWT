module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true, lowercase: true,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter Phone Number" },
        len: { args: [11,11], msg: 'Phone Number is invalid' },
        isInt: { args: true, msg: "You must enter Phone Number" },
      }
    },
    address: {
      type: Sequelize.TEXT
    }
    
  }, { sequelize });

  return Customer;
};

