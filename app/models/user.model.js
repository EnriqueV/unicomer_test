module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    cellPhone: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    profession: {
      type: Sequelize.STRING
    },
    incomes: {
      type: Sequelize.STRING
    }
    
  });

  return User;
};
