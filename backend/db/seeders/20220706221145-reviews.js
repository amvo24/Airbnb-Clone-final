'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {

        review: 'I wanna go home',
        stars: 2,
        spotId: 2,
        userId: 1
      },
      {

        review: 'I love this place',
        stars: 5,
        spotId: 1,
        userId: 2
      },
      {

        review: 'I am scared',
        stars: 1,
        spotId: 1,
        userId: 3
      },
      {

        review: '4th review',
        spotId: 1,
        userId: 3
      },
      {
        
        review: '5th review',
        stars: 1,
        spotId: 1,
        userId: 3
      }
    ])
  },


  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2] }
    });
  }
};
