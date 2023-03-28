'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'andrew',
        username: 'coder1',
        lastName: 'vo',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        username: 'Demo-lition',
        lastName: 'User',
        email: 'demo@demo.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'andres',
        username: 'coder2',
        lastName: 'ho',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'drew',
        username: 'coder3',
        lastName: 'mo',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Alice',
        username: 'alice_demo',
        lastName: 'Smith',
        email: 'alice@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Bob',
        username: 'bob_demo',
        lastName: 'Johnson',
        email: 'bob@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Charlie',
        username: 'charlie_demo',
        lastName: 'Lee',
        email: 'charlie@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Diana',
        username: 'diana_demo',
        lastName: 'Brown',
        email: 'diana@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ethan',
        username: 'ethan_demo',
        lastName: 'Davis',
        email: 'ethan@example.com',
        hashedPassword: bcrypt.hashSync('password')
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
