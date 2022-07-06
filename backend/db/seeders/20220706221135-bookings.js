'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        id: 1,
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-19",

      },
      {
        id: 2,
        spotId: 2,
        userId: 3,
        startDate: "2020-10-20",
        endDate: "2020-10-25",
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
