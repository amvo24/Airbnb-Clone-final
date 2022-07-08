'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
        id: 1,
        imageableId: 1,
        imageableType: "Spot",
        url: 'https://media.architecturaldigest.com/photos/568ef57c02bad8496774de87/16:9/w_4256,h_2394,c_limit/1_WebEstate_Kailua,%20Hawaii%20.jpg',
        //reviewId: 2,
        spotId: 1
      },
      {
        id: 2,
        imageableId: 2,
        imageableType: "Review",
        url: 'https://i.pinimg.com/originals/c7/58/43/c7584365f991ea6236fd1f19653f06a2.jpg',
        reviewId: 2,
        //spotId: 2
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      id: { [Op.in]: [1, 2] }
    });
  }
};
