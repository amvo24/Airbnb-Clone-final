'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'andrew',
        lastName: 'vo',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'andres',
        lastName: 'ho',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'drew',
        lastName: 'mo',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'] }
    }, {});
  }
};
