'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date ("2021-11-19"),
        endDate: new Date ("2021-11-19"),

      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date ("2020-10-20"),
        endDate: new Date ("2020-10-25"),
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      id: { [Op.in]: [1, 2] }
    });
  }
};
