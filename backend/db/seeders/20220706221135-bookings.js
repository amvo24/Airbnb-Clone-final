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
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-20 10:06:40"
      }

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
